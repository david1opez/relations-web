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
      const response = await fetch("https://relations-data-api.vercel.app/project/projects")

      if (!response.ok) {
        throw new Error(`Error fetching projects: ${response.status}`)
      }

      const data = await response.json()
      console.log("Proyectos recibidos del backend:", data);
      data.forEach((project: any, idx: number) => {
        console.log(`Proyecto ${idx}:`, project);
        if (project.client) {
          console.log(`-> client:`, project.client);
          console.log(`-> client.name:`, project.client.name);
        } else {
          console.log("-> client: null");
        }
      });

      // For each project, fetch the members count
      const projectsWithMembers = await Promise.all(
        data.map(async (project: any) => {
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
                status: "active", // Default status
              }
            }
          } catch (error) {
            console.error(`Error fetching members for project ${project.projectID}:`, error)
          }

          return {
            ...project,
            members: 0,
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

      <div className={styles.headerContainer}>
        <Searchbar value={searchTerm} onChange={handleSearch} />
        <button className={styles.addButton} onClick={() => setShowAddPopup(true)}>
          Agregar proyecto
        </button>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.projectID}
              project={project}
              onClick={() => handleProjectClick(project.projectID)}
              onDelete={handleDeleteProject}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            {searchTerm ? (
              <div className={styles.emptyState}>No se encontraron proyectos que coincidan con: {searchTerm}</div>
            ) : (
              <div className={styles.emptyState}>No hay proyectos registrados. Agrega uno nuevo.</div>
            )}
          </div>
        )}
      </div>

      <AddProjectPopup
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onProjectAdded={() => {
          fetchProjects()
          setShowAddPopup(false)
        }}
      />
    </div>
  )
}
