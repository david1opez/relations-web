export type Notification = {
    id: string;
    title: string;
    description: string;
    date: Date;
    isRead: boolean;
    type: 'info' | 'warning' | 'error';
}