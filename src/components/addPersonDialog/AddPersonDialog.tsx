import { useState } from "react"
import styles from "./addPersonDialog.module.css"

// Components
import Dialog from "@/components/dialog/Dialog"

// Types
import type { User, UserFormData } from "@/types/UserManagementTypes"

// Utils
import { createUser } from "@/utils/UserManagement"

interface AddPersonDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: User) => void
}

export default function AddPersonDialog({ isOpen, onClose, onSuccess }: AddPersonDialogProps) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Form state for adding a new user
  const [newUserData, setNewUserData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "colaborator",
  })

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!newUserData.name.trim()) {
      errors.name = "El nombre es requerido"
    }
    
    if (!newUserData.email.trim()) {
      errors.email = "El correo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserData.email)) {
      errors.email = "El correo no es válido"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddUser = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const createdUser = await createUser(newUserData)

      if (createdUser) {
        // Reset form
        setNewUserData({
          name: "",
          email: "",
          role: "colaborator",
        })
        setFormErrors({})
        onSuccess(createdUser)
        onClose()
      }
    } catch (error) {
      console.error("Error creating user:", error)
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
      onConfirm={handleAddUser}
      title="Agregar nuevo usuario"
      message={
        <div className={styles.addUserForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              value={newUserData.name}
              onChange={(e) => setNewUserData((prev) => ({ ...prev, name: e.target.value }))}
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
              value={newUserData.email}
              onChange={(e) => setNewUserData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="correo@ejemplo.com"
              className={formErrors.email ? styles.inputError : ""}
              disabled={isLoading}
            />
            {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              value={newUserData.role}
              onChange={(e) => setNewUserData((prev) => ({ ...prev, role: e.target.value as User["role"] }))}
              disabled={isLoading}
            >
              <option value="colaborator">Colaborador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>
      }
    />
  )
} 