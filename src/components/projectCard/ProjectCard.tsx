"use client"

import styles from "./projectCard.module.css"

// COMPONENTS
import MetadataItem from "../metadataItem/MetadataItem"
import OptionsMenu from "../optionsMenu/OptionsMenu"

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
  client?: string | { name?: string }
}

type ProjectCardProps = {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "completed":
        return "Completado"
      case "pending":
        return "Pendiente"
      default:
        return "Activo"
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{project.name}</h2>
        <p className={styles.status}>{getStatusLabel(project.status)}</p>
      </div>

      <p className={styles.description}>
        {project.description
          ? project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description
          : "Sin descripción"}
      </p>

      <MetadataItem icon="user" title="Cliente:" value={typeof project.client === 'object' && project.client?.name ? project.client.name : "sin cliente asignado"} color="var(--accent)" />

      <div className={styles.metadataContainer}>
        <MetadataItem icon="users" title="Miembros:" value={project.members?.toString() || "0"} color="var(--accent)" />
        <MetadataItem
          icon="calendar"
          title="Inicio:"
          value={project.startDate ? parseDate(project.startDate) : "No definido"}
          color="var(--accent)"
        />
        <MetadataItem
          icon="clock"
          title="Entrega:"
          value={project.endDate ? parseDate(project.endDate) : "No definido"}
          color="var(--accent)"
        />
      </div>

      <button className={styles.detailsButton} onClick={onClick}>
        Ver detalles
      </button>

      <OptionsMenu
        onSelect={() => {}}
        options={[
          { icon: "pencil", name: "Editar proyecto" },
          { icon: "close", name: "Eliminar proyecto" },
        ]}
      />
    </div>
  )
}
