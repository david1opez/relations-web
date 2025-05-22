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
  problemDescription:  string | null
  reqFuncionales:  string | null
  reqNoFuncionales:  string | null
  startDate: number | null
  endDate: number | null
  status?: "active" | "completed" | "pending"
  members?: number
  clientEmail?: string
  client?: string
}



export default function Proyectos() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddPopup, setShowAddPopup] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://relations-data-api.vercel.app/project/projects")

        if (!response.ok) {
          throw new Error(`Error fetching projects: ${response.status}`)
        }

        const data = await response.json()

        // For each project, fetch the members count
        const projectsWithMembers = await Promise.all(
          data.map(async (project: any) => { // cambio de project a any para usar client join
            try {
              // Fetch users assigned to this project
              const userResponse = await fetch(
                `https://relations-data-api.vercel.app/project/projects/${project.projectID}`,
              )
              if (userResponse.ok) {
                const userData = await userResponse.json()
                return {
                  ...project,
                  members: userData.length || 0,
                  client: project.client?.organization || "sin cliente asignado", 
                  status: "active", // Default status
                }
              }
            } catch (error) {
              console.error(`Error fetching members for project ${project.projectID}:`, error)
            }

            return {
              ...project,
              members: 0,
              client: project.client?.organization || "sin cliente asignado",
              status: "active" as const,
            }
          }),
        )

        setProjects(projectsWithMembers)
        setFilteredProjects(projectsWithMembers)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleProjectClick = (projectId: number) => {
    router.push(`/proyectos?id=${projectId}&tab=informacion`)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(term.toLowerCase()) ||
          (project.description && project.description.toLowerCase().includes(term.toLowerCase())) ||
          (project.client && project.client.toLowerCase().includes(term.toLowerCase())),
      )
      setFilteredProjects(filtered)
    }
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
