import { useState } from 'react';
import styles from './Dashboard.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Dashboard() {
    const [subpages, setSubpages] = useState<string[]>([]);

    return (
        <div className={styles.pageContainer}>
            <PageIndicator
                icon="grid"
                title="Dashboard"
                subpages={subpages}
                onPageChange={setSubpages}
            />
        </div>
    );
};
