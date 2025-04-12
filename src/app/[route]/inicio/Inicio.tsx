import { useEffect, useState } from 'react';
import styles from './inicio.module.css';

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import NotificationsDropdown from "@/components/notificationsDropdown/NotificationsDropdown";
import ActivityCard from '@/components/activityCard/ActivityCard';
import RecentActivitySection from '@/components/recentActivitySection/RecentActivitySection';
import ShortcutsSection from '@/components/shortcutsSection/ShortcutsSection';

// UTILS
import GetActivity from '@/utils/GetActivity';

// TYPES
import { Activity } from '@/types/ActivityCardTypes';

export default function Inicio() {    
    const [activity, setActivity] = useState<Activity>();

    useEffect(() => {
        GetActivity()
        .then((data) => {
            setActivity(data);
        })
        .catch((error) => {
            console.error("Error fetching activity data:", error);
        });
    }, []);

    return (
        <div className="pageContainer">
            <PageTitle
                title="Inicio"
                icon="house"
                subpages={[]}
            />

            <NotificationsDropdown />

            <h2 className={styles.headerTitle}>Bienvenido, {"Random"}</h2>
            <p className={styles.headerDescription}>Aquí tienes un resumen de tu actividad reciente</p>

            <div className={styles.activityCardsContainer}>
                <ActivityCard
                    icon='images/blue-house.svg'
                    title='Proyectos activos'
                    number={activity?.activeProjects}
                />
                <ActivityCard
                    icon='images/blue-phone.svg'
                    title='Llamadas analizadas'
                    number={activity?.analyzedCalls}
                />
                <ActivityCard
                    icon='images/blue-group.svg'
                    title='Equipos'
                    number={activity?.teams}
                />
            </div>

            <div className={styles.contentContainer}>
                <RecentActivitySection/>
                <ShortcutsSection/>
            </div>
        </div>
    )
};
