import styles from "./button.module.css";

// COMPONENTS
import Icon from "../Icon/Icon";

// TYPES
import { ButtonProps } from "./button.interface";

export default function Button({ size="medium", icon, text, disabled, onClick, className }: ButtonProps) {
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
            <h1
                className={`${styles.text} ${disabled ? styles.disabledText : ""}`}
                style={{
                    fontSize: size === "small" ? "12px" : size === "medium" ? "0.6rem" : "0.75rem"
                }}
            >
                {text}
            </h1>
        </button>
    );
}