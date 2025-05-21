
import { useState, useEffect } from "react"
import styles from "./projectAssignDialog.module.css"

// Types
import type { Project, UserProjectAssignment } from "@/types/UserManagementTypes"

// Utils
import { getProjects, assignProjectToUser, removeProjectFromUser } from "@/utils/UserManagement"

interface ProjectAssignDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (assignments: UserProjectAssignment[]) => void
  userId: number // Cambiado de string a number
  currentProjects: Project[]
}

export default function ProjectAssignDialog({
  isOpen,
  onClose,
  onConfirm,
  userId,
  currentProjects,
}: ProjectAssignDialogProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [assignments, setAssignments] = useState<UserProjectAssignment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadProjects()
    }
  }, [isOpen])

  useEffect(() => {
    // Initialize assignments based on current projects
    if (currentProjects.length > 0) {
      const initialAssignments = currentProjects.map((project) => ({
        userID: userId,
        projectID: project.projectID, // Cambiado de project.id a project.projectID
        role: "colaborator" as const,
        isAssigned: true,
      }))
      setAssignments(initialAssignments)
    } else {
      // Inicializar con un array vacío si no hay proyectos asignados
      setAssignments([])
    }
  }, [currentProjects, userId])

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const allProjects = await getProjects()
      setProjects(allProjects || [])

      // Initialize assignments for all projects
      const initialAssignments = (allProjects || []).map((project) => {
        const isCurrentlyAssigned = currentProjects.some((cp) => cp.projectID === project.projectID) // Cambiado de cp.id a cp.projectID
        return {
          userID: userId,
          projectID: project.projectID, // Cambiado de project.id a project.projectID
          role: "colaborator" as const,
          isAssigned: isCurrentlyAssigned,
        }
      })

      setAssignments(initialAssignments)
    } catch (error) {
      console.error("Error loading projects:", error)
      setProjects([])
      setAssignments([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignmentChange = (projectId: number, isAssigned: boolean) => {
    // Cambiado de string a number
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.projectID === projectId ? { ...assignment, isAssigned } : assignment)),
    )
  }

  const handleRoleChange = (projectId: number, role: "admin" | "colaborator") => {
    // Cambiado de string a number
    setAssignments((prev) =>
      prev.map((assignment) => (assignment.projectID === projectId ? { ...assignment, role } : assignment)),
    )
  }

  const handleConfirm = async () => {
    setIsLoading(true)

    // Process assignments
    for (const assignment of assignments) {
      const isCurrentlyAssigned = currentProjects.some((p) => p.projectID === assignment.projectID) // Cambiado de p.id a p.projectID

      if (assignment.isAssigned && !isCurrentlyAssigned) {
        // Add new assignment
        await assignProjectToUser(userId, [
          {
            projectID: assignment.projectID,
            projectRole: assignment.role,
          },
        ])
      } else if (!assignment.isAssigned && isCurrentlyAssigned) {
        // Remove existing assignment
        await removeProjectFromUser(assignment.userID, assignment.projectID)
      } else if (assignment.isAssigned && isCurrentlyAssigned) {
        // Update role if needed (would require additional API)
        // This would need a specific endpoint to update the role
      }
    }

    setIsLoading(false)
    onConfirm(assignments.filter((a) => a.isAssigned))
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Asignar Proyectos</h2>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <p>Cargando proyectos...</p>
          </div>
        ) : (
          <div className={styles.projectList}>
            {projects.map((project) => {
              const assignment = assignments.find((a) => a.projectID === project.projectID) // Cambiado de a.projectId a a.projectID
              if (!assignment) return null

              return (
                <div key={project.projectID} className={styles.projectItem}>
                  {" "}
                  {/* Cambiado de project.id a project.projectID */}
                  <div className={styles.projectInfo}>
                    <input
                      type="checkbox"
                      checked={assignment.isAssigned}
                      onChange={(e) => handleAssignmentChange(project.projectID, e.target.checked)} // Cambiado de project.id a project.projectID
                      className={styles.checkbox}
                    />
                    <span className={styles.projectName}>{project.name}</span>
                  </div>
                  {assignment.isAssigned && (
                    <select
                      value={assignment.role}
                      onChange={(e) => handleRoleChange(project.projectID, e.target.value as "admin" | "colaborator")} // Cambiado de project.id a project.projectID
                      className={styles.roleSelect}
                    >
                      <option value="admin">Admin</option>
                      <option value="colaborator">Colaborador</option>
                    </select>
                  )}
                </div>
              )
            })}
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