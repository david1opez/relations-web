import styles from './SidebarItem.module.css';

// COMPONENTS
import Icon from '../../Icon/Icon';

// TYPES
import { SidebarItemProps } from '../Sidebar.interface';

export default function SidebarItem ({icon, text, active, onClick}: SidebarItemProps) {
  return (
    <div
      className={`${styles.sidebarItemContainer} ${active ? styles.activeSidebarItemContainer : ''}`}
      onClick={() => onClick && onClick()}
    >
        <Icon
            name={icon}
            size={21}
            color={active ? 'var(--blue)' : 'var(--white)'}
        />

        <p className={styles.sidebarItemText}>{text}</p>
    </div>
  );
};
