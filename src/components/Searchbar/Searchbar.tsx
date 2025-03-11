import { useState } from 'react';
import styles from './searchbar.module.css';

// COMPONENTS
import Icon from '../Icon/Icon';

// TYPES
import { SearchbarProps } from './searchbar.interface';

export default function Searchbar({} : SearchbarProps) {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.input}
                placeholder="Buscar..."
            />

            <Icon
                name="search"
                size={18}
                color="var(--blue)"
            />
        </div>
    )
};