"use client";
import { useEffect, useState } from 'react';
import styles from './inicio.module.css';

// COMPONENTS
import PageTitle from '@/components/pageTitle/PageTitle';
import StatsCard from '@/components/statsCard/StatsCard';

// SECTIONS
import RecentActivity from './sections/recentActivity/RecentActivity';
// import Shortcuts from './sections/shortcuts/Shortcuts';

// UTILS
import { getUserStats } from '@/utils/activity';

// TYPES
import { Stats } from '@/types/components/statsCardTypes';

export default function Inicio() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        getUserStats().then(setStats);
    }, []);

    return (
        <div className="pageContainer">
            <PageTitle title='Inicio' icon='house'/>

            <h2 className={styles.headerTitle}>Bienvenido, {"Random"}</h2>
            <p className={styles.headerDescription}>Aquí tienes un resumen de tu actividad reciente</p>

            {
                stats && (
                    <div className={styles.statsCardsContainer}>
                        <StatsCard
                            icon='images/blue-house.svg'
                            title='Proyectos activos'
                            number={stats.activeProjects}
                        />
                        <StatsCard
                            icon='images/blue-phone.svg'
                            title='Llamadas analizadas'
                            number={stats.analyzedCalls}
                        />
                        <StatsCard
                            icon='images/blue-group.svg'
                            title='Proyectos totales'
                            number={stats.totalProjects}
                        />
                    </div>
                )
            }

            <div className={styles.contentContainer}>
                <RecentActivity/>
                {/* <Shortcuts/> */}
            </div>
        </div>
    )
}