import { useState, useEffect } from 'react';
import styles from './searchbar.module.css';

// COMPONENTS
import Icon from '../Icon/Icon';

// TYPES
import { SearchbarProps } from './searchbar.interface';

export default function Searchbar({ onChangeValue } : SearchbarProps) {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        onChangeValue(searchValue);
    }, [searchValue]);

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