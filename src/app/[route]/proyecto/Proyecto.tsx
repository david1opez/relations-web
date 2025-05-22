"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./proyecto.module.css"

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle"
import MetadataItem from "@/components/metadataItem/MetadataItem"
import Informacion from "./informacion/Informacion"
import Llamadas from "./llamadas/Llamadas"
import Recursos from "./recursos/Recursos"
import Equipos from "./equipos/Equipos"
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator"

// UTILS
import { parseDate } from "@/utils/dateUtils"

// TYPES
type Project = {
  projectID: number
  name: string
  description: string | null
  problemDescription:  string | null
  reqFuncionales:  string | null
  reqNoFuncionales:  string | null
  startDate: number | null
  endDate: number | null
  status?: "active" | "completed" | "pending"
  members?: number
  clientEmail?: string
  client?: string
  clientDescription?: string
}

const Tabs: ("informacion" | "llamadas" | "recursos" | "equipos")[] = ["informacion", "llamadas", "recursos"]

export default function Proyecto({ id }: { id: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"informacion" | "llamadas" | "recursos" | "equipos">("informacion")

  useEffect(() => {
    const tab = searchParams.get("tab") as "informacion" | "llamadas" | "recursos" | "equipos" | null
    if (tab) setActiveTab(tab)
    else setActiveTab("informacion")
  }, [searchParams])

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://relations-data-api.vercel.app/project/projects/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching project: ${response.status}`);
        }
        const data = await response.json();

        const userResponse = await fetch(
          `https://relations-data-api.vercel.app/project/projects/${data.projectID}`,
        );
        let members = 0;
        if (userResponse.ok) {
          const userData = await userResponse.json();
          members = userData.length || 0;
        }
        setProject({
          projectID: data.projectID,
          name: data.name,
          description: data.description,
          problemDescription: data.problemDescription,
          reqFuncionales: data.reqFuncionales,
          reqNoFuncionales: data.reqNoFuncionales,
          startDate: data.startDate ? new Date(data.startDate).getTime() : null,
          endDate: data.endDate ? new Date(data.endDate).getTime() : null,
          client: data.client?.organization || "sin cliente asignado",
          clientEmail: data.clientEmail || "sin cliente asignado",
          clientDescription: data.client?.description || "sin cliente asignado",
          status: "active",
      });
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
    } finally {
      setLoading(false);
    }
    };
    if (id) {
      fetchProject();
    }
    }, [id]);

  if (loading) {
    return (
      <div className="pageContainer">
        <PageTitle
          title="Proyectos"
          icon="rocket"
          subpages={[id.toString()]}
          onPageChange={() => router.push("/proyectos")}
        />
        <div className={styles.loadingContainer}>
          <ActivityIndicator size={40} color="var(--accent)" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pageContainer">
        <PageTitle
          title="Proyectos"
          icon="rocket"
          subpages={[id.toString()]}
          onPageChange={() => router.push("/proyectos")}
        />
        <div className={styles.errorContainer}>Proyecto no encontrado</div>
      </div>
    )
  }

  return (
    <div className="pageContainer">
      <PageTitle
        title="Proyectos"
        icon="rocket"
        subpages={[project.name]}
        onPageChange={() => router.push("/proyectos")}
      />

      <p className={styles.label}>Nombre del proyecto:</p>
      <h1 className={styles.projectTitle}>{project.name}</h1>

      <div className={styles.metadataContainer}>
        <MetadataItem icon="user" title="Cliente" value={project.client || "None"} color="var(--accent)" />
        <MetadataItem icon="users" title="Miembros" value={project.members?.toString() || "0"} color="var(--accent)" />
        <MetadataItem
          icon="calendar"
          title="Fecha de inicio"
          value={project.startDate ? parseDate(project.startDate) : "No definido"}
          color="var(--accent)"
        />
        <MetadataItem
          icon="clock"
          title="Fecha de entrega"
          value={project.endDate ? parseDate(project.endDate) : "No definido"}
          color="var(--accent)"
        />
      </div>

      <div className={styles.tabsContainer}>
        {Tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "informacion"
              ? "Información"
              : tab === "llamadas"
                ? "Llamadas"
                : tab === "recursos"
                  ? "Recursos"
                  : tab === "equipos"
                    ? "Equipos"
                    : ""}
          </button>
        ))}
      </div>

      {activeTab === "informacion" ? (
        <Informacion id={id} project={project} />
      ) : activeTab === "llamadas" ? (
        <Llamadas id={id} />
      ) : activeTab === "recursos" ? (
        <Recursos id={id} />
      ) : activeTab === "equipos" ? (
        <Equipos id={id} />
      ) : null}
    </div>
  )
}
