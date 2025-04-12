import styles from './recentActivityItem.module.css';

// COMPONENTS
import Icon from '@/components/Icon/Icon';

// TYPES
import { RecentActivityItemProps } from '@/types/RecentActivityItemTypes';
import MetadataItem from '@/components/metadataItem/MetadataItem';

export default function RecentActivityItem({ icon, title, description, time, user }: RecentActivityItemProps) {
    return (
        <div className={styles.container}>
            <Icon
                name={icon}
                size={28}
                color="var(--light-gray)"
            />

            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.metadataContainer}>
                <MetadataItem
                    icon="clock"
                    title="Hace:"
                    value={time}
                />
                <MetadataItem
                    icon="user"
                    title="Por:"
                    value={user}
                />
            </div>
        </div>
    );
};
