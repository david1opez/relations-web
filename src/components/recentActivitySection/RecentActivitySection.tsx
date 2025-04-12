import styles from './recentActivitySection.module.css';

// COMPONENTS
import RecentActivityItem from '@/components/recentActivitySection/recentActivityItem/RecentActivityItem';
import Icon from '@/components/icon/Icon';

export default function RecentActivitySection() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon
                    name='activity'
                    size={20}
                    color='var(--accent)'
                />
                <h2>Actividad reciente</h2>

                <button className={styles.reloadButton}>
                    Actualizar
                    <Icon
                        name='reload'
                        size={14}
                        color='var(--black)'
                    />
                </button>
            </div>

            <div className={styles.recentActivityItemsContainer}>
                {
                    [1,2,3,4,5].map((item, index) => (
                        <RecentActivityItem
                            key={index}
                            icon="rocket"
                            title="Título de la actividad"
                            description="Descripción de la actividad"
                            time="2 horas"
                            user="Usuario"
                        />
                    ))
                }
            </div>
        </div>
    );
}