"use client";
import { useState, useEffect } from 'react';
import styles from './recentActivity.module.css';

// COMPONENTS
import RecentActivityItem from './recentActivityItem/RecentActivityItem';
import Icon from '@/components/icon/Icon';

// UTILS
import { getActivity } from '@/utils/activity';
import { formatTimeAgo } from '@/utils/time';

// TYPES
import { Activity } from '@/types/activityTypes';
import ActivityIndicator from '@/components/activityIndicator/ActivityIndicator';

export default function RecentActivitySection() {
    const [loading, setLoading] = useState(true);
    const [activity, setActivity] = useState<Activity[] | null>(null);

    const handleReload = () => {
        setLoading(true);
        setActivity(null);

        getActivity()
        .then(setActivity)
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getActivity()
        .then(setActivity)
        .finally(() => setLoading(false));
        
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon
                    name='activity'
                    size={20}
                    color='var(--accent)'
                />
                <h2>Actividad reciente</h2>

                <button
                    className={styles.reloadButton}
                    onClick={() => handleReload()}
                >
                    {
                        loading ? (
                            <ActivityIndicator color="var(--black)"/>
                        ) : (
                            "Actualizar"
                        )
                    }

                    {
                        !loading && (
                            <Icon
                                name='reload'
                                size={14}
                                color='var(--black)'
                            />
                        )
                    }
                </button>
            </div>

            <div className={styles.recentActivityItemsContainer}>
                {
                    activity?.map((item, index) => (
                        <RecentActivityItem
                            key={index}
                            icon="rocket"
                            title={item.action}
                            description={item.where || " ___"}
                            time={formatTimeAgo(item.date)}
                            user={item.username}
                        />
                    ))
                }

                {
                    activity?.length === 0 && (
                        <p className={styles.noActivityMessage}>
                            No hay actividad reciente
                        </p>
                    )
                }
            </div>
        </div>
    );
}