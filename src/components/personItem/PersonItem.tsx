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
