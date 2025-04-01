import { useState } from 'react';
import styles from './Tutoriales.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Tutoriales() {
    const [subpages, setSubpages] = useState<string[]>([]);

    return (
        <div className={styles.pageContainer}>
            <PageIndicator
                icon="question"
                title="Tutoriales"
                subpages={subpages}
                onPageChange={setSubpages}
            />
        </div>
    );
};
