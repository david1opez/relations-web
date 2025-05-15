import { useState } from 'react';
import styles from './projectAssignDialog.module.css';

interface Project {
    id: string;
    name: string;
}

interface ProjectAssignment {
    projectId: string;
    role: 'admin' | 'colaborador';
    isAssigned: boolean;
}

interface ProjectAssignDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (assignments: ProjectAssignment[]) => void;
}

// Datos de ejemplo - esto debería venir de tu backend
const MOCK_PROJECTS: Project[] = [
    { id: '1', name: 'Plataforma eCommerce' },
    { id: '2', name: 'Plataforma eCommerce' },
    { id: '3', name: 'Plataforma eCommerce' },
    { id: '4', name: 'Plataforma eCommerce' },
];

export default function ProjectAssignDialog({ isOpen, onClose, onConfirm }: ProjectAssignDialogProps) {
    const [assignments, setAssignments] = useState<ProjectAssignment[]>(
        MOCK_PROJECTS.map(project => ({
            projectId: project.id,
            role: 'colaborador',
            isAssigned: false,
        }))
    );

    if (!isOpen) return null;

    const handleAssignmentChange = (projectId: string, isAssigned: boolean) => {
        setAssignments(prev => prev.map(assignment => 
            assignment.projectId === projectId 
                ? { ...assignment, isAssigned } 
                : assignment
        ));
    };

    const handleRoleChange = (projectId: string, role: 'admin' | 'colaborador') => {
        setAssignments(prev => prev.map(assignment => 
            assignment.projectId === projectId 
                ? { ...assignment, role } 
                : assignment
        ));
    };

    const handleConfirm = () => {
        onConfirm(assignments);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2 className={styles.title}>Asignar Proyectos</h2>
                <div className={styles.projectList}>
                    {MOCK_PROJECTS.map(project => {
                        const assignment = assignments.find(a => a.projectId === project.id)!;
                        return (
                            <div key={project.id} className={styles.projectItem}>
                                <div className={styles.projectInfo}>
                                    <input
                                        type="checkbox"
                                        checked={assignment.isAssigned}
                                        onChange={(e) => handleAssignmentChange(project.id, e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.projectName}>{project.name}</span>
                                </div>
                                {assignment.isAssigned && (
                                    <select
                                        value={assignment.role}
                                        onChange={(e) => handleRoleChange(project.id, e.target.value as 'admin' | 'colaborador')}
                                        className={styles.roleSelect}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="colaborador">Colaborador</option>
                                    </select>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={handleConfirm} className={styles.confirmButton}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
} 