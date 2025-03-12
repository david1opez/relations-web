import styles from './galeriaDeProyectos.module.css';

// TYPES
import { GaleriaDeProyectosProps } from './galeriaDeProyectos.interface';

export default function GaleriaDeProyectos({ onSelectProject }: GaleriaDeProyectosProps) {
    return (
        <div className={styles.container}>
            <button
                onClick={() => onSelectProject({name: "Dashboard para Deliveries"})}
                style={{marginRight: "2rem", border: "1px solid black", cursor: "pointer"}}
            >
                Dashboard para Deliveries
            </button>
            <button
                onClick={() => onSelectProject({name: "Proyecto 1"})}
                style={{marginRight: "2rem", border: "1px solid black", cursor: "pointer"}}
            >
                Proyecto 1
            </button>
            <button
                onClick={() => onSelectProject({name: "Proyecto 2"})}
                style={{marginRight: "2rem", border: "1px solid black", cursor: "pointer"}}
            >
                Proyecto 2
            </button>
        </div>
    );
};
