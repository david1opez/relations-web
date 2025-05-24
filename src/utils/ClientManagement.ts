import type { Client, ClientFormData } from "@/types/ClientTypes"

const API_BASE_URL = "https://relations-data-api.vercel.app"

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/client/clients`)
    if (!response.ok) throw new Error("Failed to fetch clients")
    return await response.json()
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}

export const createClient = async (clientData: ClientFormData): Promise<Client | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/client/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
    
    if (!response.ok) throw new Error("Failed to create client")
    return await response.json()
  } catch (error) {
    console.error("Error creating client:", error)
    return null
  }
}

export const deleteClient = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/client/clients/${email}`, {
      method: "DELETE",
    })
    
    if (!response.ok) throw new Error("Failed to delete client")
    return true
  } catch (error) {
    console.error("Error deleting client:", error)
    return false
  }
} 