import { useState, useEffect } from "react"
import styles from "./projectAssignDialog.module.css"

// Types
import type { Project, UserProjectAssignment } from "@/types/UserManagementTypes"

// Utils
import { getProjects, getUserProjects, assignProjectToUser, removeProjectFromUser, updateUserProjectAssignments } from "@/utils/UserManagement"

interface ProjectAssignDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: number 
}

export default function ProjectAssignDialog({
  isOpen,
  onClose,
  userId,
}: ProjectAssignDialogProps) {
  const [assignments, setAssignments] = useState<UserProjectAssignment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && assignments.length === 0) {
      const loadData = async () => {
        setIsLoading(true)
        const fetchedProjects: Project[] = await getProjects()
        const userProjects: UserProjectAssignment[] = await getUserProjects(userId)

        // Create assignments array with all projects, marking existing ones as assigned
        const allAssignments = fetchedProjects.map(project => {
          const userProject = userProjects.find(up => up.project.projectID === project.projectID)
          return {
            userID: userId,
            project: project,
            projectRole: userProject?.projectRole || 'colaborator',
            isAssigned: !!userProject
          }
        })

        setAssignments(allAssignments)
        setIsLoading(false)
      }

      loadData()
    }
  }, [isOpen])

  const handleAssignmentChange = (projectId: number, isAssigned: boolean) => {
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.project.projectID === projectId ? { ...assignment, isAssigned } : assignment)),
    )
  }

  const handleRoleChange = (projectId: number, role: "admin" | "colaborator") => {
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.project.projectID === projectId ? { ...assignment, projectRole: role } : assignment)),
    )
  }

  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      // Filter only assigned projects and format the data
      const assignedProjects = assignments
        .filter(assignment => assignment.isAssigned)
        .map(assignment => ({
          projectID: assignment.project.projectID,
          projectRole: assignment.projectRole || 'colaborator'
        }))

      const success = await updateUserProjectAssignments(userId, assignedProjects)
      
      if (!success) {
        throw new Error('Failed to update project assignments')
      }

      setIsLoading(false)
      onClose()
    } catch (error) {
      console.error('Error updating project assignments:', error)
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Asignar Proyectos</h2>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <p>Cargando...</p>
          </div>
        ) : (
          <div className={styles.projectList}>
            {assignments.map((assignment) => (
              <div key={assignment.project.projectID} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <input
                    type="checkbox"
                    checked={assignment.isAssigned}
                    onChange={(e) => handleAssignmentChange(assignment.project.projectID, e.target.checked)} 
                    className={styles.checkbox}
                  />
                  <span className={styles.projectName}>{assignment.project.name}</span>
                </div>
                {assignment.isAssigned && (
                  <select
                    value={assignment.projectRole}
                    onChange={(e) => handleRoleChange(assignment.project.projectID, e.target.value as "admin" | "colaborator")}
                    className={styles.roleSelect}
                  >
                    <option value="admin">Administrador</option>
                    <option value="colaborator">Colaborador</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleConfirm} className={styles.confirmButton} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  )
}