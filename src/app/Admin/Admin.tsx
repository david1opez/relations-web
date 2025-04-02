import { useState } from 'react';
import styles from './Admin.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Admin() {
    const [subpages, setSubpages] = useState<string[]>([]);

    return (
        <div className={styles.pageContainer}>
            <PageIndicator
                icon="people"
                title="Admin"
                subpages={subpages}
                onPageChange={setSubpages}
            />
        </div>
    );
};
