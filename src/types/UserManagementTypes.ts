export type User = {
    userID: number // Cambiado de id: string a userID: number
    name: string
    email: string
    role: "admin" | "colaborator" | "support" | "teamLead" | "projectLead"
    profilePicture?: string
    department?: {
      // Cambiado a objeto para reflejar la estructura del backend
      departmentID: number
      name: string
    }
    password?: string
  }
  
  export type Project = {
    projectID: number // Cambiado de id: string a projectID: number
    name: string
    description?: string
    client?: string
    startDate?: number
    endDate?: number
    status?: "active" | "completed" | "pending"
  }
  
  export type UserProjectAssignment = {
    userID: number // Cambiado de userId: string a userID: number
    projectID: number // Cambiado de projectId: string a projectID: number
    role: "admin" | "colaborator"
    isAssigned: boolean
  }
  
  export type UserFormData = {
    name: string
    email: string
    password: string
    role: "admin" | "colaborator" | "support" | "teamLead" | "projectLead"
    departmentID?: number // Cambiado de department?: string a departmentID?: number
  }
  