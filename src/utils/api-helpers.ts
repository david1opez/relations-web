// utils/api-helpers.ts

// URL base para la API
export const API_BASE_URL2 = "https://relations-data-api.vercel.app"

/**
 * Realiza una solicitud a la API con manejo de errores mejorado
 */
export async function apiRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any
) {
  try {
    const url = `${API_BASE_URL2}${endpoint}`
    console.log(`Realizando solicitud ${method} a: ${url}`)
    
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }
    
    if (body) {
      options.body = JSON.stringify(body)
    }
    
    const response = await fetch(url, options)
    
    // Intentar obtener el cuerpo de la respuesta
    let data
    const contentType = response.headers.get("content-type")
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      data = await response.text()
    }
    
    if (!response.ok) {
      throw new Error(typeof data === "string" ? data : JSON.stringify(data))
    }
    
    return data
  } catch (error) {
    console.error(`Error en solicitud ${method} ${endpoint}:`, error)
    throw error
  }
}