import styles from './metadataItem.module.css';

// COMPONENTS
import Icon from '@/components/icon/Icon';

// TYPES
import { MetadataItemProps } from '@/types/MetadataItemTypes';

export default function MetadataItem({ icon, title, value, color, className }: MetadataItemProps) {
    return (
        <div className={`${styles.container} ${className}`}>
            <Icon
                name={icon}
                size={13}
                color={color ? color : 'var(--light-gray)'}
            />

            <p className={styles.metadata}>
                {title} <span className={styles.value}>{value}</span>
            </p>
        </div>
    );
};
