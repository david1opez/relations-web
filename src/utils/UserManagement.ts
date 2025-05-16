import type { User, Project, UserFormData, UserProjectAssignment } from "@/types/UserManagementTypes"

// URL base para la API
const API_BASE_URL = "https://relations-data-api.vercel.app"

/**
 * Obtiene todos los usuarios
 */
export async function getUsers(): Promise<User[]> {
  try {
    console.log("Fetching users from:", `${API_BASE_URL}/user/users`)

    const response = await fetch(`${API_BASE_URL}/user/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error details:", errorText)
      throw new Error(`Error fetching users: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Users fetched successfully:", data)
    return data
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

/**
 * Obtiene un usuario por su ID
 */
export async function getUserById(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error fetching user ${userId}:`, errorText)
      throw new Error(`Error fetching user: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error)
    return null
  }
}

/**
 * Crea un nuevo usuario
 */
export async function createUser(userData: UserFormData): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error creating user:", errorText)
      throw new Error(`Error creating user: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

/**
 * Actualiza el rol de un usuario
 */
export async function updateUserRole(userId: number, role: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error updating user ${userId} role:`, errorText)
      throw new Error(`Error updating user role: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error updating user ${userId} role:`, error)
    return null
  }
}

/**
 * Actualiza un usuario
 */
export async function updateUser(userId: number, userData: Partial<UserFormData>): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error updating user ${userId}:`, errorText)
      throw new Error(`Error updating user: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error)
    return null
  }
}

/**
 * Elimina un usuario
 */
export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error deleting user ${userId}:`, errorText)
      throw new Error(`Error deleting user: ${response.status} ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error)
    return false
  }
}

/**
 * Obtiene todos los proyectos
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error fetching projects:", errorText)
      throw new Error(`Error fetching projects: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

/**
 * Asigna un proyecto a un usuario
 */
export async function assignProjectToUser(assignment: UserProjectAssignment): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects/${assignment.projectID}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: assignment.userID,
        role: assignment.role,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error assigning project to user:", errorText)
      throw new Error(`Error assigning project: ${response.status} ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error assigning project to user:", error)
    return false
  }
}

/**
 * Obtiene los proyectos asignados a un usuario
 */
export async function getUserProjects(userId: number): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/project/user-projects?userID=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error fetching projects for user ${userId}:`, errorText)
      throw new Error(`Error fetching user projects: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching projects for user ${userId}:`, error)
    return []
  }
}

/**
 * Elimina un proyecto de un usuario
 */
export async function removeProjectFromUser(userId: number, projectId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/project/projects/${projectId}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userId,
        remove: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error removing project ${projectId} from user ${userId}:`, errorText)
      throw new Error(`Error removing project: ${response.status} ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error(`Error removing project ${projectId} from user ${userId}:`, error)
    return false
  }
}
