"use client"

import { useState, useEffect } from "react"
import styles from "./proyectos.module.css"
import { useRouter } from "next/navigation"

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle"
import Searchbar from "@/components/searchbar/Searchbar"
import ProjectCard from "@/components/projectCard/ProjectCard"
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator"
import AddProjectPopup from "./AddProjectPopup"

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
  status?: "active" | "completed" | "unknown"
  members?: number
  clientEmail?: string
  client?: string | { name?: string }
}

export default function Proyectos() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("active")

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [projects, searchTerm, statusFilter])

  const getStatusFromEndDate = (endDate: number | null): "active" | "completed" | "unknown" => {
    if (!endDate) return "active"

    try {
      const endDateTime = new Date(endDate).getTime()
      const currentDate = new Date().getTime()

      if (isNaN(endDateTime)) {
        console.warn("Invalid end date format:", endDate)
        return "unknown"
      }

      return endDateTime > currentDate ? "active" : "completed"
    } catch (error) {
      console.error("Error processing end date:", error)
      return "unknown"
    }
  }

  const getStatusLabel = (endDate: number | null): string => {
    if (!endDate) return "Activo"

    try {
      const endDateTime = new Date(endDate).getTime()
      const currentDate = new Date().getTime()

      if (isNaN(endDateTime)) return "Estado desconocido"
      return endDateTime > currentDate ? "Activo" : "Completado"
    } catch {
      return "Estado desconocido"
    }
  }

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const [projectsResponse, membersCountResponse] = await Promise.all([
        fetch("https://relations-data-api.vercel.app/project/projects"),
        fetch("https://relations-data-api.vercel.app/project/projects/members-count")
      ])

      if (!projectsResponse.ok) {
        throw new Error(`Error fetching projects: ${projectsResponse.status}`)
      }

      const projects = await projectsResponse.json()
      const membersCounts = await membersCountResponse.json()

      const projectsWithMembers = projects.map((project: any) => ({
        ...project,
        members: membersCounts[project.projectID] || 0,
        status: getStatusFromEndDate(project.endDate)
      }))

      setProjects(projectsWithMembers)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...projects]

    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(lowerTerm) ||
        project.description?.toLowerCase().includes(lowerTerm) ||
        (typeof project.client === "object" && project.client?.name?.toLowerCase().includes(lowerTerm))
      )
    }

    setFilteredProjects(filtered)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleProjectClick = (projectId: number) => {
    router.push(`/proyectos?id=${projectId}`)
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.projectID !== projectId))
  }

  if (loading) {
    return (
      <div className="pageContainer">
        <PageTitle title="Proyectos" icon="rocket" subpages={[]} />
        <div className={styles.loadingContainer}>
          <ActivityIndicator size={40} color="var(--accent)" />
        </div>
      </div>
    )
  }

  return (
    <div className="pageContainer">
      <PageTitle title="Proyectos" icon="rocket" subpages={[]} />

      <div className={styles.topBar}>
        <div className={styles.searchContainer}>
          <Searchbar value={searchTerm} onChange={handleSearch} />
        </div>
        <div className={styles.filterButtons}>
          <button
            className={statusFilter === "active" ? styles.activeFilter : ""}
            onClick={() => setStatusFilter("active")}
          >
            Activos
          </button>
          <button
            className={statusFilter === "completed" ? styles.activeFilter : ""}
            onClick={() => setStatusFilter("completed")}
          >
            Completados
          </button>
          <button
            className={statusFilter === "all" ? styles.activeFilter : ""}
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </button>
        </div>
      </div>

      <AddProjectPopup
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onProjectAdded={() => setShowAddPopup(false)}
      />

      <div className={styles.projectsContainer}>
        <div className={styles.addProjectCard} onClick={() => setShowAddPopup(true)}>
          <div className={styles.addIcon}>+</div>
          <div className={styles.addText}>Crear proyecto</div>
        </div>

        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard
              key={project.projectID}
              project={project}
              onClick={() => handleProjectClick(project.projectID)}
            />
          ))
        ) : (
          <div className={styles.noProjects}>
            {searchTerm
              ? "No se encontraron proyectos que coincidan con la búsqueda."
              : "No hay proyectos disponibles."}
          </div>
        )}
      </div>
    </div>
  )
}
