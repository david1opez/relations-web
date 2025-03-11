import styles from "./button.module.css";

// COMPONENTS
import Icon from "../Icon/Icon";

// TYPES
import { ButtonProps } from "./button.interface";

export default function Button({ icon, text, disabled, onClick, className }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ""} ${className}`}
            onClick={onClick}
        >
            {
                icon && (
                    <Icon name={icon} size={20} color="var(--blue)"/>
                )
            }
            <h1 className={`${styles.text} ${disabled ? styles.disabledText : ""}`}>{text}</h1>
        </button>
    );
}