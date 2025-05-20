"use-client"
import { useEffect, useRef, useState } from 'react';
import styles from './notificationsDropdown.module.css';

// COMPONENTS
import Icon from '@/components/icon/Icon';
import ActivityIndicator from '@/components/activityIndicator/ActivityIndicator';

// UTILS
import GetNotifications from '@/utils/GetNotifications';

// TYPES
import { Notification } from '@/types/NotificationTypes';

export default function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleNotificationsView = () => {
        setIsOpen(!isOpen);

        setNotifications((prevNotifications) => {
            return prevNotifications.map((notification) => {
                if (!notification.isRead) {
                    return {
                        ...notification,
                        isRead: true,
                    };
                }
                return notification;
            });
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        GetNotifications()
        .then((data) => {
            setLoading(false);
            setNotifications(data);
        });
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <Icon
                name="bell"
                size={22}
                color={`${isOpen ? 'var(--accent)' : 'var(--light-gray)'}`}
                onClick={() => handleNotificationsView()}
            />
            
            {
                notifications.some((notification) => !notification.isRead) && (
                    <div className={styles.notificationDot} data-testid="notification-dot"></div>
                )
            }

            {
                isOpen && (
                    <div className={styles.notificationsContainer}>
                        {
                            loading ? (
                                <ActivityIndicator/>
                            ) : (
                                notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div key={notification.id} className={styles.notification}>
                                            <p>{notification.title}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noNotifications}>
                                        Sin notificaciones
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};
