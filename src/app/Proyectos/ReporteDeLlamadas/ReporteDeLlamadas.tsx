import { useEffect, useState } from 'react';
import styles from './reporteDeLlamadas.module.css';

// COMPONENTS
// import Searchbar from '@/components/Searchbar/Searchbar';
import CallComponent from '@/components/CallComponent/CallComponent';
import Calendar from '@/components/Calendar/Calendar';

// TYPES
import { Project } from '@/app/Proyectos/GaleriaDeProyectos/galeriaDeProyectos.interface';

export default function ReporteDeLlamadas({ project }: { project: Project }) {
    const [calls, setCalls] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        if(!calls) {
            setCalls([]);
            console.log(project)
        }
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.subtitle}>Historial de llamadas</h1>
            {/* <Searchbar onChangeValue={(value) => { console.log(value) }} /> */}

            <div className={styles.contentContainer}>
                <div className={styles.callsContainer}>
                    {calls.map((call, index) => (
                        <CallComponent onClick={() => {}} key={index} call={call as unknown as { callID: string; title: string; attendees: string[]; startTime: number; endTime: number }} />
                    ))}
                </div>

                <div className={styles.calendarContainer}>
                    <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </div>
            </div>
        </div>
    );
};