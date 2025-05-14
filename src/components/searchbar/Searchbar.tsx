import styles from './searchbar.module.css';

// COMPONENTS
import Icon from '../icon/Icon';

export default function Searchbar({ value, onChange }: { value?: string; onChange?: (value: string) => void;}) {
    return (
        <div className={styles.container}>
            <input
                placeholder='Buscar...'
                className={styles.input}
                type="text"
                value={value && value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <Icon
                name="search"
                size={16}
                color='var(--light-gray)'
            />
        </div>
    );
};
