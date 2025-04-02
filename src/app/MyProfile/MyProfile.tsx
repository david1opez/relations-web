import { useState } from 'react';
import styles from './MyProfile.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function MyProfile() {
    const [subpages, setSubpages] = useState<string[]>([]);

    return (
        <div className={styles.pageContainer}>
            <PageIndicator
                icon="people"
                title="Profile"
                subpages={subpages}
                onPageChange={setSubpages}
            />
        </div>
    );
};
