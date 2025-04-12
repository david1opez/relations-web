import styles from './input.module.css';

// TYPES
import { InputProps } from '@/types/InputTypes';

export default function Input({label, value, onChange}: InputProps) {
    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
