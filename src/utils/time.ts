export function formatTimeAgo(timestamp: string): string {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
        return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hora${hours !== 1 ? 's' : ''}`;
    } else {
        const days = Math.floor(seconds / 86400);
        return `${days} día${days !== 1 ? 's' : ''}`;
    }
}

export function parseDate(timestamp: string | null): string {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
