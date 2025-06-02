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
import Miembros from "./miembros/Miembros"
import AddProjectPopup from "../proyectos/AddProjectPopup"

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

const Tabs = ["informacion", "llamadas", "recursos", "equipos", "miembros"] as const
type TabType = typeof Tabs[number]

export default function Proyecto({ id }: { id: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("informacion")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab") as TabType | null
    if (tab) setActiveTab(tab)
    else setActiveTab("informacion")
  }, [searchParams])

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // Hacer las dos llamadas en paralelo
        const [projectResponse, membersCountResponse] = await Promise.all([
          fetch(`https://relations-data-api.vercel.app/project/projects/${id}`),
          fetch(`https://relations-data-api.vercel.app/project/projects/${id}/members-count`)
        ]);

        if (!projectResponse.ok) {
          throw new Error(`Error fetching project: ${projectResponse.status}`);
        }

        const projectData = await projectResponse.json();
        const membersCount = await membersCountResponse.json();

        setProject({
          projectID: projectData.projectID,
          name: projectData.name,
          description: projectData.description,
          problemDescription: projectData.problemDescription,
          reqFuncionales: projectData.reqFuncionales,
          reqNoFuncionales: projectData.reqNoFuncionales,
          startDate: projectData.startDate ? new Date(projectData.startDate).getTime() : null,
          endDate: projectData.endDate ? new Date(projectData.endDate).getTime() : null,
          client: projectData.client?.organization || "sin cliente asignado",
          clientEmail: projectData.clientEmail || "sin cliente asignado",
          clientDescription: projectData.client?.description || "sin cliente asignado",
          status: "active",
          members: membersCount.count || 0,
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

      <div className={styles.headerContainer}>
        <div>
          <p className={styles.label}>Nombre del proyecto:</p>
          <h1 className={styles.projectTitle}>{project.name}</h1>
        </div>
        <button 
          className={styles.editButton}
          onClick={() => setIsEditModalOpen(true)}
        >
          Editar Proyecto
        </button>
      </div>

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
                    : tab === "miembros"
                      ? "Miembros"
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
      ) : activeTab === "miembros" ? (
        <Miembros id={id} />
      ) : null}

      {isEditModalOpen && (
        <AddProjectPopup
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onProjectAdded={() => {
            setIsEditModalOpen(false);
            // Refetch project data
            const fetchProject = async () => {
              setLoading(true);
              try {
                const [projectResponse, membersCountResponse] = await Promise.all([
                  fetch(`https://relations-data-api.vercel.app/project/projects/${id}`),
                  fetch(`https://relations-data-api.vercel.app/project/projects/${id}/members-count`)
                ]);

                if (!projectResponse.ok) {
                  throw new Error(`Error fetching project: ${projectResponse.status}`);
                }

                const projectData = await projectResponse.json();
                const membersCount = await membersCountResponse.json();

                setProject({
                  ...projectData,
                  startDate: projectData.startDate ? new Date(projectData.startDate).getTime() : null,
                  endDate: projectData.endDate ? new Date(projectData.endDate).getTime() : null,
                  client: projectData.client?.organization || "sin cliente asignado",
                  clientEmail: projectData.clientEmail || "sin cliente asignado",
                  clientDescription: projectData.client?.description || "sin cliente asignado",
                  status: "active",
                  members: membersCount.count || 0,
                });
              } catch (error) {
                console.error(`Error fetching project ${id}:`, error);
              } finally {
                setLoading(false);
              }
            };
            fetchProject();
          }}
          projectToEdit={{
            projectID: project.projectID,
            name: project.name,
            description: project.description,
            problemDescription: project.problemDescription,
            reqFuncionales: project.reqFuncionales,
            reqNoFuncionales: project.reqNoFuncionales,
            startDate: project.startDate ? new Date(project.startDate).toISOString() : null,
            endDate: project.endDate ? new Date(project.endDate).toISOString() : null,
            client: {
              email: project.clientEmail || "",
              name: project.client || "",
              organization: project.client || "",
              description: project.clientDescription || ""
            }
          }}
        />
      )}
    </div>
  )
}
