import styles from './projectCard.module.css';

// COMPONENTS
import MetadataItem from '../metadataItem/MetadataItem';
import OptionsMenu from '../optionsMenu/OptionsMenu';

// TYPES
import { ProjectCardProps } from '@/types/ProjectCardTypes';

export default function ProjectCard({ onClick }: ProjectCardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Plataforma eCommerce</h2>
                <p className={styles.status}>Activo</p>
            </div>

            <p className={styles.description}>
                Desarrollo de una plataforma de comercio electrónico
                con integración de pagos y gestión de...
            </p>

            <MetadataItem
                icon='user'
                title='Cliente:'
                value='Sunlight Logistics'
                color='var(--accent)'
            />

            <div className={styles.metadataContainer}>
                <MetadataItem
                    icon='users'
                    title='Miembros:'
                    value='28'
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='calendar'
                    title='Inicio:'
                    value='12/10/2023'
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='clock'
                    title='Entrega:'
                    value='12/10/2023'
                    color='var(--accent)'
                />
            </div>

            <button
                className={styles.detailsButton}
                onClick={onClick}
            >
                Ver detalles
            </button>

            <OptionsMenu
                onSelect={() => {}}
                options={[]}
            />
        </div>
    );
};
