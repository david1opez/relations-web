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
  startDate: number | null
  endDate: number | null
  status?: "active" | "completed" | "pending"
  members?: number
  client?: string
}

const Tabs: ("informacion" | "llamadas" | "recursos" | "equipos")[] = ["informacion", "llamadas", "recursos", "equipos"]

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
    // Simulate loading
    setLoading(true)

    // Use static data instead of fetching from API
    setTimeout(() => {
      setProject({
        projectID: id,
        name: "Plataforma eCommerce móvil",
        description:
          "Desarrollo de una plataforma de comercio electrónico con integración de pagos y gestión de inventario.",
        startDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
        endDate: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 days in future
        members: 28,
        client: "Sunlight Logistics",
        status: "active",
      })
      setLoading(false)
    }, 500)
  }, [id])

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
