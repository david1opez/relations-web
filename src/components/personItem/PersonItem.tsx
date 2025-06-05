import { useState, useEffect } from "react"
import styles from "./personItem.module.css"

// Components
import Dialog from "../dialog/Dialog"
import ProjectAssignDialog from "../projectAssignDialog/ProjectAssignDialog"

// Types
import type { User } from "@/types/UserManagementTypes"

// Utils
import { updateUserRole, deleteUserWithRelations } from "@/utils/UserManagement"

interface PersonItemProps {
  user: User
  onDelete: (id: number) => void 
  onRoleChange: (id: number, role: string) => void 
}

export default function PersonItem({ user, onDelete, onRoleChange }: PersonItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProjectAssignDialogOpen, setIsProjectAssignDialogOpen] = useState(false)
  const [role, setRole] = useState(user.role ?? "colaborator") // Aseguramos que el rol tenga un valor por defecto
  const [isLoading, setIsLoading] = useState(false)

// Dentro del componente PersonItem
  const handleDelete = async () => {
    try {
      setIsLoading(true)
      
      console.log(`Iniciando eliminación del usuario: ${user.name} (ID: ${user.userID})`)
      
      // Usar la función para eliminar usuario
      const success = await deleteUserWithRelations(user.userID)
      
      if (success) {
        console.log(`Usuario ${user.name} eliminado correctamente`)
        onDelete(user.userID)
        setIsDeleteDialogOpen(false)
      } else {
        console.error(`No se pudo eliminar el usuario ${user.name}`)
        alert("No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.")
      }
    } catch (err) {
      console.error("Error al eliminar usuario:", err)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleRoleChange = async (newRole: string) => {
    setRole(newRole as User["role"])
    const updatedUser = await updateUserRole(user.userID, newRole) 
    if (updatedUser) {
      onRoleChange(user.userID, newRole) 
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p className={styles.label}>Nombre:</p>
        <p className={styles.data} title={user.name}>{user.name}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Correo:</p>
        <p className={styles.data} title={user.email}>{user.email}</p>
      </div>

      <div className={styles.dataContainer}>
        <label className={styles.label} htmlFor={`role-select-${user.userID}`}>Rol:</label>
        <select
          id={`role-select-${user.userID}`}
          className={styles.select}
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="admin" className={styles.option}>
            Administrador
          </option>
          <option value="colaborator" className={styles.option}>
            Colaborador
          </option>
        </select>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton} onClick={() => setIsDeleteDialogOpen(true)}>
          Eliminar
        </button>
        <button className={styles.assignButton} onClick={() => setIsProjectAssignDialogOpen(true)}>
          Asignar proyectos
        </button>
      </div>
      

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro que quieres eliminar a ${user.name}?`}
      />

      <ProjectAssignDialog
        isOpen={isProjectAssignDialogOpen}
        onClose={() => setIsProjectAssignDialogOpen(false)}
        userId={user.userID} 
      />
    </div>
  )
}

