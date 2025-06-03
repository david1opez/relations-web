import styles from './statsCard.module.css';
import Image from 'next/image';

// COMPONENTS
import ActivityIndicator from '@/components/activityIndicator/ActivityIndicator';

// TYPES
import { StatsCardProps } from '@/types/components/statsCardTypes';

export default function StatsCard({ icon, title, number }: StatsCardProps) {
    return (
        <div className={styles.activityCard}>
            <Image
                src={icon}
                alt="House"
                width={100}
                height={100}
                className={styles.activityCardIcon}
            />
            <div>
                <h4 className={styles.activityCardTitle}>{title}</h4>

                {
                    number !== undefined || number !== null ? (
                        <p className={styles.activityCardNumber}>{number}</p>
                    ) : (
                        <ActivityIndicator color='var(--light-gray)'/>
                    )
                }
            </div>
        </div>
    );
};
