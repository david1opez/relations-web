export const calcDuration = (startTime: number, endTime: number): string => {
    if (!startTime || !endTime) return "0m 0s";

    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const durationInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    
    return `${minutes}m ${seconds}s`;
};

export const parseDate = (dateInMs: number): string => {
    if (!dateInMs) return "00/00/0000";
    
    const date = new Date(dateInMs);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('es-MX', options).replace(/\//g, '/');
    
    return formattedDate;
}