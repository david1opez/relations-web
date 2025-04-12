import { IconName } from "./IconTypes";

export type IconSelectorProps = {
    label: string;
    value: IconName;
    onChange: (icon: IconName) => void;
};
