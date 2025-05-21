import type { User, Project, UserFormData, UserProjectAssignment } from "@/types/UserManagementTypes"
import { apiRequest, API_BASE_URL2 } from './api-helpers';
// URL base para la API
const API_BASE_URL = "https://relations-data-api.vercel.app"

/**
 * Obtiene todos los usuarios
 */
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })


    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error details:", errorText)
      throw new Error(`Error fetching users: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
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
    // Construir la URL correcta con el API_BASE_URL
    const url = `${API_BASE_URL}/user/users/${userId}`;    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
        
    // Intentar obtener el cuerpo de la respuesta
    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      // Si no es JSON, obtener como texto
      responseBody = await response.text();
    }
      
    // Si la respuesta no es exitosa, retornar false en lugar de lanzar un error
    if (!response.ok) {
      console.error(`Error al eliminar usuario ${userId}:`, responseBody);
      return false; // Cambio importante: retornar false en lugar de lanzar error
    }
    return true;
  } catch (error) {
    console.error("Error en la función deleteUser:", error);
    return false;
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
export async function assignProjectToUser(
  userId: number,
  selectedProjects: Array<{ projectID: number; projectRole: string }>,
) {
  try {
    // Preparar los datos en el formato que espera el backend
    const users = [
      {
        userID: userId,
        projectRole: selectedProjects.length > 0 ? selectedProjects[0].projectRole : null,
      },
    ]

    // Obtener el ID del proyecto (asumiendo que estamos trabajando con un proyecto específico)
    const projectId = selectedProjects.length > 0 ? selectedProjects[0].projectID : null

    if (!projectId) {
      throw new Error("No se seleccionó ningún proyecto")
    }

    // Realizar la solicitud al backend - AQUÍ ESTÁ EL CAMBIO: Agregamos API_BASE_URL
    const response = await fetch(`${API_BASE_URL}/project/projects/${projectId}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users }),
    })

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error al asignar proyectos:", errorData)
      throw new Error(errorData.message || "Error al asignar proyectos")
    }

    // Procesar la respuesta exitosa
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en la solicitud:", error)
    throw error
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
    // Log the URL for debugging
    const url = `${API_BASE_URL}/project/projects/${projectId}/users`

    // IMPORTANT: The backend expects an empty users array or users with projectRole
    // It will REPLACE all existing user assignments with what we send
    // To remove a specific user, we need to get all current users, then send back everyone EXCEPT the one to remove

    // First, get all current users for this project
    const currentProjectUsers = await fetch(`${API_BASE_URL}/project/projects/${projectId}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Error fetching current project users:", err)
        return []
      })

    // Filter out the user we want to remove
    const updatedUsers = Array.isArray(currentProjectUsers)
      ? currentProjectUsers
          .filter((user) => user.userID !== userId)
          .map((user) => ({
            userID: user.userID,
            projectRole: user.projectRole || "colaborator",
          }))
      : []

    // Send the updated list (without the removed user)
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: updatedUsers }),
    })

    // Try to get the response body for more detailed error information
    let responseBody
    try {
      responseBody = await response.json()
    } catch (e) {
      const textResponse = await response.text()
    }

    if (!response.ok) {
      console.error(`Error removing project ${projectId} from user ${userId}`)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error removing project ${projectId} from user ${userId}:`, error)
    return false
  }
}

/**
 * Elimina un usuario y todas sus relaciones (proyectos asignados)
 */
export async function deleteUserWithRelations(userId: number): Promise<boolean> {
  try {    
    // 1. Obtener los proyectos asignados al usuario
    let userProjects = [];
    try {
      userProjects = await apiRequest(`/project/user-projects?userID=${userId}`);
    } catch (projectsError) {
      console.error("Error al obtener proyectos, continuando con la eliminación:", projectsError);
    }
    
    // 2. Eliminar las asignaciones de proyectos
    if (userProjects && userProjects.length > 0) {
      for (const project of userProjects) {
        try {
          // Actualizar el proyecto para quitar al usuario
          await apiRequest(`/project/projects/${project.projectID}/users`, "PATCH", {
            users: [] // Array vacío para eliminar todas las asignaciones
          });
        } catch (projectError) {
          console.error(`Error al eliminar asignación del proyecto ${project.projectID}:`, projectError);
          // Continuamos con los demás proyectos
        }
      }
    }
    
    // 3. Ahora eliminar el usuario
    try {
      await apiRequest(`/user/users/${userId}`, "DELETE");
      return true;
    } catch (deleteError) {
      console.error(`Error al eliminar usuario ${userId}:`, deleteError);
      return false;
    }
  } catch (error) {
    console.error(`Error general al eliminar usuario ${userId}:`, error);
    return false;
  }
}