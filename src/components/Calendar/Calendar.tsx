import { useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { CalendarProps } from './Calendar.interface';

// ICONO
import Icon from '@/components/Icon/Icon';

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [startingDayOfWeek, setStartingDayOfWeek] = useState(0);

    const getStartingDayOfWeek = () => {
        const day = new Date(new Date().getFullYear(), currentMonth, 1).getDay();

        if(day === 0) return -1;
        else return day - 2;
    };

    const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();

    const handleDateClick = (day: number) => {
        const newDate = new Date(new Date().getFullYear(), currentMonth, day);
        onDateChange(newDate);
    };

    const goToNextMonth = () => setCurrentMonth((prev) => (prev + 1) % 12);
    const goToPreviousMonth = () => setCurrentMonth((prev) => (prev - 1 + 12) % 12);

    useEffect(() => {
        setStartingDayOfWeek(getStartingDayOfWeek());

        console.log(getStartingDayOfWeek());
    }, [currentMonth]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon
                    name="arrowLeft"
                    size={20}
                    color="#6CCDEA"
                    onClick={goToPreviousMonth}
                    className={styles.arrowIcon}
                />
                <span className={styles.title}>
                    {new Date(new Date().getFullYear(), currentMonth).toLocaleString('es-MX', { month: 'long' })}
                </span>
                <Icon
                    name="arrowRight"
                    size={20}
                    color="#6CCDEA"
                    onClick={goToNextMonth}
                    className={styles.arrowIcon}
                />
            </div>

            <div className={styles.calendarGrid}>
                {daysOfWeek.map((day) => (
                    <span key={day} className={styles.day}>{day}</span>
                ))}
                {Array.from({ length: daysInMonth + startingDayOfWeek }, (_, index) => (
                    <div
                        key={index + 1}
                        className={`${styles.date} ${selectedDate.getDate() === index + 1 ? styles.selectedDate : ""}`}
                        onClick={() => handleDateClick(index + 1)}
                        style={{
                            pointerEvents: index < startingDayOfWeek + 1 ? "none" : "auto",
                        }}
                    >
                        {index <= startingDayOfWeek ? "" : index - startingDayOfWeek}
                    </div>
                ))}
            </div>
        </div>
    );
}