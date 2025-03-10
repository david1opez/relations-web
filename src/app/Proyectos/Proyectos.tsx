import { useState } from 'react';
import styles from './Proyectos.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Proyectos() {
    const [subpages, setSubpages] = useState<string[]>(["project1"]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.projectsPageIndicator}>
                <PageIndicator
                    icon="rocket"
                    title="Proyectos"
                    subpages={subpages}
                    onPageChange={setSubpages}
                />

                {/* <YearSelector value={2025} onYearChange={(year) => {}}/> */}
            </div>

            {/* <Searchbar/> */}
        </div>
    );
}