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
  status?: "active" | "completed" | "pending"
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

  useEffect(() => {
    fetchProjects()
  }, [])

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

      console.log("Proyectos recibidos del backend:", projects)
      
      // Map projects with their member counts
      const projectsWithMembers = projects.map((project: any) => ({
        ...project,
        members: membersCounts[project.projectID] || 0,
        status: "active" // Default status
      }))

      setProjects(projectsWithMembers)
      setFilteredProjects(projectsWithMembers)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim() === "") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(value.toLowerCase()) ||
          project.description?.toLowerCase().includes(value.toLowerCase()) ||
          (typeof project.client === 'object' && project.client?.name?.toLowerCase().includes(value.toLowerCase()))
      )
      setFilteredProjects(filtered)
    }
  }

  const handleProjectClick = (projectId: number) => {
    router.push(`/proyectos?id=${projectId}`)
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.projectID !== projectId))
    setFilteredProjects((prev) => prev.filter((project) => project.projectID !== projectId))
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
      </div>
      <AddProjectPopup isOpen={showAddPopup} onClose={() => setShowAddPopup(false)} onProjectAdded={() => setShowAddPopup(false)} />

      {loading ? (
        <div className={styles.loadingContainer}>
          <ActivityIndicator size={40} color="var(--accent)" />
        </div>
      ) : (
        <div className={styles.projectsContainer}>
          {/* Add Project Card */}
          <div className={styles.addProjectCard} onClick={() => setShowAddPopup(true)}>
            <div className={styles.addIcon}>+</div>
            <div className={styles.addText}>Crear proyecto</div>
          </div>
          {/* Project Cards */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
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
      )}
    </div>
  )
}
