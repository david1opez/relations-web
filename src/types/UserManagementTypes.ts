export type User = {
    userID: number 
    name: string
    email: string
    role: "admin" | "colaborator"
    profilePicture?: string
  }
  
  export type Project = {
    projectID: number
    name: string
    description?: string
    client?: string
    startDate?: number
    endDate?: number
    status?: "active" | "completed" | "pending"
  }
  
  export type UserProjectAssignment = {
    userID: number 
    project: Project
    projectRole?: "admin" | "colaborator"
    isAssigned?: boolean
  }
  
  export type UserFormData = {
    name: string
    email: string
    role: "admin" | "colaborator"
    profilePicture?: string
  }
  