import { useState } from 'react';
import styles from './Llamadas.module.css';

// COMPONENTS
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Llamadas() {
  const [subpages, setSubpages] = useState<string[]>([]);
  
  return (
    <div className={styles.pageContainer}>
        <PageIndicator
            icon="phone"
            title="Llamadas"
            subpages={subpages}
            onPageChange={setSubpages}
        />
    </div>
  );
};
