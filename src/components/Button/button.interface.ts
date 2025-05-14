import { IconName } from "../Icon/Icon.interface";

export type ButtonProps = {
    disabled?: boolean;
    icon?: IconName;
    text: string;
    onClick?: () => void;
    className?: string;
    size?: "small" | "medium" | "large";
};
