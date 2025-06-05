import styles from './searchbar.module.css';

// COMPONENTS
import Icon from '../icon/Icon';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function Searchbar({ value, onChange, className }: Props) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <input
        placeholder="Buscar..."
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <Icon
        name="search"
        size={16}
        color="var(--light-gray)"
      />
    </div>
  );
}
