import styles from './dropdown.module.css';

// COMPONENTS
import Icon from '@/components/icon/Icon';

// TYPES
import { DropdownProps } from '@/types/DropdownTypes';

export default function Dropdown({value, options, onChange}: DropdownProps) {
    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                value={value}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value);
                    }
                }}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option} className={styles.option}>
                        {option}
                    </option>
                ))}
            </select>
            <Icon
                name="down-chevron"
                className={styles.icon}
                size={16}
                color="var(--color-text)"
            />
        </div>
    );
};
