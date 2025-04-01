import styles from './reporteGeneral.module.css';

// TYPES
import { Project } from '../GaleriaDeProyectos/galeriaDeProyectos.interface';

export default function ReporteGeneral({ project }: { project: Project }) {
    return (
        <div className={`${styles.container} ${styles.reporteGeneral}`}>
            {/* Contenido Principal */}
            <div className={styles.mainContent}>
                <p className={`${styles.projectSubTitle} ${styles.textLight}`}>Nombre del Proyecto:</p>
                <h1 className={styles.projectTitle}>Dashboard para Deliveries</h1>
                
                <p className={`${styles.projectSubTitle} ${styles.textLight}`}>Cliente:</p>
                <p className={`${styles.projectClient} ${styles.textLight}`}>Sunlight Logistics</p>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Descripción de la Problemática:</h2>
                    <p className={styles.textLight}>
                        Nam at ultricies nunc. Curabitur ut dolor erat. Quisque tempor facilisis nunc sit amet tincidunt. 
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Necesidades del Cliente:</h2>
                    <p className={styles.textLight}>
                        Nam at ultricies nunc. Curabitur ut dolor erat. Quisque tempor facilisis nunc sit amet tincidunt.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Requerimientos Funcionales:</h2>
                    <p className={styles.textLight}>
                        Nam at ultricies nunc. Curabitur ut dolor erat. 
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Requerimientos No Funcionales:</h2>
                    <p className={styles.textLight}>
                        Nam at ultricies nunc. Curabitur ut dolor erat. 
                    </p>
                </div>

                <button className={styles.pdfButton}>
                    📄 Exportar como PDF
                </button>
            </div>

            {/* Recursos */}
            <div className={styles.resources}>
                <h3>Recursos:</h3>
                <p className={`${styles.textLight} ${styles.resourceDescription}`}>
                    Los archivos aquí cargados se utilizarán como contexto para actualizar el reporte general.
                </p>

                <div className={styles.resourceFiles}>
                    <div className={`${styles.fileCard} ${styles.textLight}`}>document_name.pdf <br /> 856 kb</div>
                    <div className={`${styles.fileCard} ${styles.textLight}`}>document_name.pdf <br /> 856 kb</div>
                </div>

                <button className={styles.addResourceButton}>
                    Añadir Recurso
                </button>
            </div>
        </div>
    );
}