// TYPES
import { Notification } from '@/types/NotificationTypes';

export default async function GetNotifications(): Promise<Notification[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const notifications: Notification[] = [
                {
                    id: '1',
                    title: 'Notificación 1',
                    description: 'Descripción de la notificación 1',
                    date: new Date(),
                    isRead: false,
                    type: 'info',
                },
                {
                    id: '2',
                    title: 'Notificación 2',
                    description: 'Descripción de la notificación 2',
                    date: new Date(),
                    isRead: false,
                    type: 'warning',
                },
                {
                    id: '3',
                    title: 'Notificación 3',
                    description: 'Descripción de la notificación 3',
                    date: new Date(),
                    isRead: false,
                    type: 'error',
                },
            ];
            resolve(notifications);
        }, 2000); // Simulando un retraso de 1 segundo
    });

}