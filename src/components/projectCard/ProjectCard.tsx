"use client"

import { useState } from "react"
import styles from "./projectCard.module.css"

// COMPONENTS
import MetadataItem from "../metadataItem/MetadataItem"
import OptionsMenu from "../optionsMenu/OptionsMenu"
import Dialog from "../dialog/Dialog"

// UTILS
import { parseDate } from "@/utils/dateUtils"
import { deleteProject } from "@/utils/ProjectManagement"

// TYPES
type Project = {
  projectID: number
  name: string
  description: string | null
  problemDescription: string | null
  reqFuncionales: string | null
  reqNoFuncionales: string | null
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
  onDelete?: (projectId: number) => void
}

export default function ProjectCard({ project, onClick, onDelete }: ProjectCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      
      console.log(`Iniciando eliminación del proyecto: ${project.name} (ID: ${project.projectID})`)
      
      const success = await deleteProject(project.projectID)
      
      if (success) {
        console.log(`Proyecto ${project.name} eliminado correctamente`)
        onDelete?.(project.projectID)
        setIsDeleteDialogOpen(false)
      } else {
        console.error(`No se pudo eliminar el proyecto ${project.name}`)
        alert("No se pudo eliminar el proyecto. Por favor, inténtalo de nuevo.")
      }
    } catch (err) {
      console.error("Error al eliminar proyecto:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionSelect = (option: string) => {
    switch (option) {
      case "Eliminar proyecto":
        setIsDeleteDialogOpen(true)
        break
      case "Editar proyecto":
        // TODO: Implement edit functionality
        break
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

      <MetadataItem
        icon="user"
        title="Cliente:"
        value={typeof project.client === 'object' && project.client?.name ? project.client.name : "sin cliente asignado"}
        color="var(--accent)"
      />

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
        onSelect={handleOptionSelect}
        options={[
          { icon: "pencil", name: "Editar proyecto" },
          { icon: "close", name: "Eliminar proyecto" },
        ]}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro que quieres eliminar el proyecto "${project.name}"?`}
      />
    </div>
  )
}
