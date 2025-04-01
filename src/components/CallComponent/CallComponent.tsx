import styles from './callComponent.module.css';

// COMPONENTS
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

// UTILS
import { calcDuration, parseDate } from '@/utils/dateUtils';

// TYPES
import { CallComponentProps } from './callComponent.interface';

export default function CallComponent({ call, onClick }: CallComponentProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <Icon
                        name="phone"
                        size={20}
                        color='var(--black)'
                    />
                </div>
                <div className={styles.titleContainer}>
                    <h3 className={styles.title}>{call?.title || "Discusión sobre diseño de dashboard"}</h3>
                    <p className={styles.attendees}>{call?.attendees?.join(", ") || "Rosalinda Vazquez, Irma Galindo, Antonio Mellado"}</p>
                </div>
                <div className={styles.durationContainer}>
                    <p className={styles.duration}>{calcDuration(call?.startDate, call?.endDate)}</p>
                    <p className={styles.date}>{parseDate(call?.startDate)}</p>
                </div>

                <Button text="Más detalles" onClick={() => onClick(call?.id || "")} />
            </div>
        </>
    );
};