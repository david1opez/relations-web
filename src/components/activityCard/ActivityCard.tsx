import styles from './activityCard.module.css';
import Image from 'next/image';

// COMPONENTS
import ActivityIndicator from '@/components/ActivityIndicator/ActivityIndicator';

// TYPES
import { ActivityCardProps } from '@/types/ActivityCardTypes';

export default function ActivityCard({ icon, title, number }: ActivityCardProps) {
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
                    number ? (
                        <p className={styles.activityCardNumber}>{number}</p>
                    ) : (
                        <ActivityIndicator color='var(--light-gray)'/>
                    )
                }
            </div>
        </div>
    );
};
