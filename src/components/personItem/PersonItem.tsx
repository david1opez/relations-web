/*
import { useState } from 'react';

import styles from './personItem.module.css';
import Dialog from '../dialog/Dialog';
import ProjectAssignDialog from '../projectAssignDialog/ProjectAssignDialog';

export default function PersonItem() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isProjectAssignDialogOpen, setIsProjectAssignDialogOpen] = useState(false);

    const handleDelete = () => {
        // Aquí irá la lógica de eliminación
        setIsDeleteDialogOpen(false);
    };

    const handleProjectAssignment = (assignments: any[]) => {
        // Aquí irá la lógica para guardar las asignaciones
        console.log('Proyectos asignados:', assignments);
    };

    return (
        <div className={styles.container}>
            <div className={styles.dataContainer}>
                <p className={styles.label}>Nombre:</p>
                <p className={styles.data}>Weak Password User</p>
            </div>

            <div className={styles.dataContainer}>
                <p className={styles.label}>Correo:</p>
                <p className={styles.data}>weak@example.com</p>
            </div>

            <div className={styles.dataContainer}>
                <p className={styles.label}>Departamento:</p>
                <p className={styles.data}>Ventas</p>
            </div>

            <div className={styles.dataContainer}>
                <p className={styles.label}>Rol:</p>
                <select className={styles.select}>
                    <option value="admin" className={styles.option}>Admin</option>
                    <option value="user" className={styles.option}>Colaborador</option>
                </select>
            </div>

            <div className={styles.dataContainer}>
                <p className={styles.label}>Proyectos asignados:</p>
                <p className={styles.data}>4</p>
            </div>

            <button 
                className={styles.deleteButton}
                onClick={() => setIsDeleteDialogOpen(true)}
            >
                Eliminar
            </button>
            <button 
                className={styles.assignButton}
                onClick={() => setIsProjectAssignDialogOpen(true)}
            >
                Asignar proyectos
            </button>

            <Dialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                title="Confirmar eliminación"
                message="¿Estás seguro que quieres eliminar este usuario?"
            />

            <ProjectAssignDialog
                isOpen={isProjectAssignDialogOpen}
                onClose={() => setIsProjectAssignDialogOpen(false)}
                onConfirm={handleProjectAssignment}
            />
        </div>
    );
};
*/



import { useState, useEffect } from "react"
import styles from "./personItem.module.css"

// Components
import Dialog from "../dialog/Dialog"
import ProjectAssignDialog from "../projectAssignDialog/ProjectAssignDialog"

// Types
import type { User, Project } from "@/types/UserManagementTypes"

// Utils
import { updateUserRole, deleteUser, getUserProjects } from "@/utils/UserManagement"

interface PersonItemProps {
  user: User
  onDelete: (id: number) => void // Cambiado de string a number
  onRoleChange: (id: number, role: string) => void // Cambiado de string a number
}

export default function PersonItem({ user, onDelete, onRoleChange }: PersonItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProjectAssignDialogOpen, setIsProjectAssignDialogOpen] = useState(false)
  const [role, setRole] = useState(user.role)
  const [assignedProjects, setAssignedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUserProjects = async () => {
      setIsLoading(true)
      const projects = await getUserProjects(user.userID) // Cambiado de user.id a user.userID
      setAssignedProjects(projects)
      setIsLoading(false)
    }

    loadUserProjects()
  }, [user.userID]) // Cambiado de user.id a user.userID

  const handleDelete = async () => {
    const success = await deleteUser(user.userID) // Cambiado de user.id a user.userID
    if (success) {
      onDelete(user.userID) // Cambiado de user.id a user.userID
    }
    setIsDeleteDialogOpen(false)
  }

  const handleRoleChange = async (newRole: string) => {
    setRole(newRole as User["role"])
    const updatedUser = await updateUserRole(user.userID, newRole) // Cambiado de user.id a user.userID
    if (updatedUser) {
      onRoleChange(user.userID, newRole) // Cambiado de user.id a user.userID
    }
  }

  const handleProjectAssignment = async (assignments: any[]) => {
    // The actual assignment is handled in the ProjectAssignDialog component
    // Here we just close the dialog and refresh the projects
    setIsProjectAssignDialogOpen(false)
    const projects = await getUserProjects(user.userID) // Cambiado de user.id a user.userID
    setAssignedProjects(projects)
  }

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p className={styles.label}>Nombre:</p>
        <p className={styles.data}>{user.name}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Correo:</p>
        <p className={styles.data}>{user.email}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Departamento:</p>
        <p className={styles.data}>{user.department ? user.department.name : "No asignado"}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Rol:</p>
        <select className={styles.select} value={role} onChange={(e) => handleRoleChange(e.target.value)}>
          <option value="admin" className={styles.option}>
            Admin
          </option>
          <option value="colaborator" className={styles.option}>
            Colaborador
          </option>
          <option value="support" className={styles.option}>
            Soporte
          </option>
          <option value="teamLead" className={styles.option}>
            Líder de Equipo
          </option>
          <option value="projectLead" className={styles.option}>
            Líder de Proyecto
          </option>
        </select>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.label}>Proyectos asignados:</p>
        <p className={styles.data}>{isLoading ? "Cargando..." : assignedProjects.length}</p>
      </div>

      <button className={styles.deleteButton} onClick={() => setIsDeleteDialogOpen(true)}>
        Eliminar
      </button>
      <button className={styles.assignButton} onClick={() => setIsProjectAssignDialogOpen(true)}>
        Asignar proyectos
      </button>

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
        onConfirm={handleProjectAssignment}
        userId={user.userID} // Cambiado de user.id a user.userID
        currentProjects={assignedProjects}
      />
    </div>
  )
}