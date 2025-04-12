import styles from './sidebarPage.module.css';

// COMPONENTS
import Icon from '@/components/icon/Icon';

// TYPES
import { SidebarItemProps } from '@/types/SidebarTypes';

export default function SidebarPage ({icon, pageName, active, onClick}: SidebarItemProps) {
  return (
    <div
      className={`${styles.sidebarItemContainer} ${active ? styles.activeSidebarItemContainer : ''}`}
      onClick={() => onClick && onClick()}
    >
        <Icon
            name={icon}
            size={20}
            color={active ? 'var(--accent)' : 'var(--light-gray)'}
        />

        <p className={styles.sidebarItemText}>{pageName}</p>
    </div>
  );
};
