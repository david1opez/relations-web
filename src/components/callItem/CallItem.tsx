import styles from './callItem.module.css';

// COMPONENTS
import MetadataItem from '../metadataItem/MetadataItem';
import Icon from '../icon/Icon';

export default function CallItem() {
    return (
        <div className={styles.container}>
            <Icon
                name="phone"
                color='var(--light-gray)'
                size={20}
                className={styles.icon}
            />
            <div className={styles.headerContainer}>
                <p className={styles.callTitle}>Reunión inicial con cliente</p>
                <MetadataItem
                    title='Asistentes:'
                    value='Juan, Pedro, Sofía'
                    icon='users'
                />
            </div>
            <div>
                <MetadataItem
                    title='Fecha:'
                    value='2023-10-01'
                    icon='calendar'
                />
                <MetadataItem
                    title='Duración:'
                    value='12m 30s'
                    icon='clock'
                    className={styles.metadataMargin}
                />
            </div>
            <button className={styles.button}>
                Ver detalles
            </button>
        </div>
    );
};
