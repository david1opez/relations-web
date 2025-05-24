import { useState } from "react"
import styles from "./clientItem.module.css"

// Components
import Dialog from "../dialog/Dialog"

// Types
import type { Client } from "@/types/ClientTypes"

// Utils
import { deleteClient } from "@/utils/ClientManagement"

interface ClientItemProps {
  client: Client
  onDelete: (email: string) => void
}

export default function ClientItem({ client, onDelete }: ClientItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      
      console.log(`Iniciando eliminación del cliente: ${client.name} (Email: ${client.email})`)
      
      const success = await deleteClient(client.email)
      
      if (success) {
        console.log(`Cliente ${client.name} eliminado correctamente`)
        onDelete(client.email)
        setIsDeleteDialogOpen(false)
      } else {
        console.error(`No se pudo eliminar el cliente ${client.name}`)
        alert("No se pudo eliminar el cliente. Por favor, inténtalo de nuevo.")
      }
    } catch (err) {
      console.error("Error al eliminar cliente:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p className={styles.label}>Nombre:</p>
        <p className={styles.data} title={client.name}>{client.name}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Correo:</p>
        <p className={styles.data} title={client.email}>{client.email}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Organización:</p>
        <p className={styles.data} title={client.organization || "No especificada"}>
          {client.organization || "No especificada"}
        </p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Descripción:</p>
        <p className={styles.data} title={client.description || "Sin descripción"}>
          {client.description || "Sin descripción"}
        </p>
      </div>

      <button className={styles.deleteButton} onClick={() => setIsDeleteDialogOpen(true)} disabled={isLoading}>
        Eliminar
      </button>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro que quieres eliminar a ${client.name}?`}
      />
    </div>
  )
} 