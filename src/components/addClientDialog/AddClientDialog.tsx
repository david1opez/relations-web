import { useState } from "react"
import styles from "./addClientDialog.module.css"

// Components
import Dialog from "@/components/dialog/Dialog"

// Types
import type { Client, ClientFormData } from "@/types/ClientTypes"

// Utils
import { createClient } from "@/utils/ClientManagement"

interface AddClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (client: Client) => void
}

export default function AddClientDialog({ isOpen, onClose, onSuccess }: AddClientDialogProps) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const [newClientData, setNewClientData] = useState<ClientFormData>({
    name: "",
    email: "",
    organization: "",
    description: "",
  })

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!newClientData.name.trim()) {
      errors.name = "El nombre es requerido"
    }
    
    if (!newClientData.email.trim()) {
      errors.email = "El correo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newClientData.email)) {
      errors.email = "El correo no es válido"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddClient = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const createdClient = await createClient(newClientData)

      if (createdClient) {
        // Reset form
        setNewClientData({
          name: "",
          email: "",
          organization: "",
          description: "",
        })
        setFormErrors({})
        onSuccess(createdClient)
        onClose()
      }
    } catch (error) {
      console.error("Error creating client:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setFormErrors({})
      }}
      onConfirm={handleAddClient}
      title="Agregar nuevo cliente"
      message={
        <div className={styles.addClientForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              value={newClientData.name}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre completo"
              className={formErrors.name ? styles.inputError : ""}
              disabled={isLoading}
            />
            {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo:</label>
            <input
              id="email"
              type="email"
              value={newClientData.email}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="correo@ejemplo.com"
              className={formErrors.email ? styles.inputError : ""}
              disabled={isLoading}
            />
            {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="organization">Organización:</label>
            <input
              id="organization"
              type="text"
              value={newClientData.organization}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, organization: e.target.value }))}
              placeholder="Nombre de la organización"
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              value={newClientData.description}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del cliente"
              disabled={isLoading}
            />
          </div>
        </div>
      }
    />
  )
} 