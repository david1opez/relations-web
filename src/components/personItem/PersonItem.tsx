import styles from './personItem.module.css';

export default function PersonItem() {
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

            <button className={styles.deleteButton}>Eliminar</button>
            <button className={styles.assignButton}>Asignar proyectos</button>
        </div>
    );
};
