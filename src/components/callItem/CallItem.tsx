import styles from './callItem.module.css';

// COMPONENTS
import MetadataItem from '../metadataItem/MetadataItem';
import Icon from '../icon/Icon';

import { CallItemProps } from '@/types/CallItemTypes';
import { calcDuration, parseDate } from '@/utils/dateUtils';

export default function CallItem({ call, onClick }: CallItemProps) {
    const duration = calcDuration(call.startTime, call.endTime);

    return (
        <div className={styles.container}>
            <Icon
                name="phone"
                color='var(--light-gray)'
                size={20}
                className={styles.icon}
            />
            <div className={styles.headerContainer}>
                <p className={styles.callTitle}>{call.title}</p>
                <MetadataItem
                    title='Asistentes:'
                    value={call.attendees ? call.attendees.join(', ') : 'Sin asistentes'}
                    icon='users'
                />
            </div>
            <div>
                <MetadataItem
                    title='Fecha:'
                    value={parseDate(call.startTime)}
                    icon='calendar'
                />
                <MetadataItem
                    title='Duración:'
                    value={duration}
                    icon='clock'
                    className={styles.metadataMargin}
                />
            </div>
            <button 
                className={styles.button}
                onClick={() => onClick(call.callID)}
            >
                Ver detalles
            </button>
        </div>
    );
};