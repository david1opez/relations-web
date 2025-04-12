import { useState } from 'react';
import styles from './Personas.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Personas() {
    const [subpages, setSubpages] = useState<string[]>([]);

    return (
        <div className={styles.pageContainer}>
            <PageTitle
                icon="people"
                title="Personas"
                subpages={subpages}
                onPageChange={setSubpages}
            />
        </div>
    );
};
