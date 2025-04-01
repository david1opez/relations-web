import styles from './galeriaDeProyectos.module.css';

// INTERFACES
import { GaleriaDeProyectosProps } from './galeriaDeProyectos.interface';

export default function GaleriaDeProyectos({ onSelectProject }: GaleriaDeProyectosProps) {
    const proyectos = [
        {
            status: 'Activo',
            cliente: 'Sunlight Logistics',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies in tellus in venenatis. In malesuada lacus nec est congue ultrices. Integer rhoncus...',
            ultimaActualizacion: '01/Feb/2025, 12:23 a.m.',
            nombre: 'Dashboard para Deliveries'
        },
        {
            status: 'Inactivo',
            cliente: 'Tech Solutions',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies in tellus in venenatis. In malesuada lacus nec est congue ultrices. Integer rhoncus...',
            ultimaActualizacion: '01/Feb/2025, 12:23 a.m.',
            nombre: 'Proyecto 1'
        },
        {
            status: 'Completado',
            cliente: 'Global Corp',
            descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies in tellus in venenatis. In malesuada lacus nec est congue ultrices. Integer rhoncus...',
            ultimaActualizacion: '01/Feb/2025, 12:23 a.m.',
            nombre: 'Proyecto 2'
        }
    ];

    return (
        <div className={styles.gridContainer}>
            {proyectos.map((proyecto, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={`${styles.status} ${styles[proyecto.status.toLowerCase()]}`}>
                            {proyecto.status}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className={styles.ultimaActualizacion}>
                                Última Actualización
                            </span>
                            <span className={styles.ultimaActualizacion}>
                                {proyecto.ultimaActualizacion}
                            </span>
                        </div>
                    </div>

                    <h3 className={styles.title}>{proyecto.nombre}</h3>

                    <div className={styles.textBlock}>
                        <p className={styles.label}><strong>Cliente:</strong></p>
                        <p className={styles.info}>{proyecto.cliente}</p>
                    </div>

                    <div className={styles.textBlock}>
                        <p className={styles.label}><strong>Descripción General:</strong></p>
                        <p className={styles.info}>{proyecto.descripcion}</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.button}
                            onClick={() => onSelectProject({ name: proyecto.nombre })}
                        >
                            Abrir Proyecto
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}