import { useState } from 'react';
import styles from './reporteDeLlamadas.module.css';

// COMPONENTS
import Searchbar from '@/components/Searchbar/Searchbar';
import CallComponent from '@/components/CallComponent/CallComponent';

export default function ReporteDeLlamadas() {
    const [calls, setCalls] = useState([1,2,3,4,5,6,7,8]);

    return (
        <div className={styles.container}>
            <h1 className={styles.subtitle}>Historial de llamadas</h1>
            <Searchbar/>

            <div className={styles.contentContainer}>
                <div className={styles.callsContainer}>
                    {
                        calls.map((call, index) => (
                            <CallComponent key={index} call={call}/>
                        ))
                    }
                </div>

                {/* <Calendar/> */}
            </div>
        </div>
    );
};
