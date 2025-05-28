import type { Project } from "@/types/UserManagementTypes"

const API_BASE_URL = "https://relations-data-api.vercel.app"

export const deleteProject = async (projectId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects/${projectId}`, {
      method: "DELETE",
    })
    
    if (!response.ok) throw new Error("Failed to delete project")
    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    return false
  }
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
} 