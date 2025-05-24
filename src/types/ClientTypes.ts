export type Client = {
  email: string      // Primary key
  name: string
  organization?: string
  description?: string
}

export type ClientFormData = {
  name: string
  email: string
  organization?: string
  description?: string
} 