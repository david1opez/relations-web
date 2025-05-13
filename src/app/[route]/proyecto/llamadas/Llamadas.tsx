import styles from './llamadas.module.css';

// COMPONENTS
import Searchbar from '@/components/searchbar/Searchbar';
import CallItem from '@/components/callItem/CallItem';

export default function Llamadas({ id }: { id:string }) {
    return (
        <div className={styles.container}>
            <Searchbar/>

            <div className={styles.container}>
                <CallItem/>
                <CallItem/>
                <CallItem/>
                <CallItem/>
                <CallItem/>
                <CallItem/>
            </div>
        </div>
    );
}
