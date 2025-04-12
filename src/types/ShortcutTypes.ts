// TYPES
import { IconName } from "./IconTypes";

export type ShortcutType = {
    id: string,
    icon: IconName;
    title: string;
    editable?: boolean;
    redirect: {title: string, value: string}[];
};

export type ShortcutProps = {
    id: string;
    icon: IconName;
    title: string;
    redirect: {title: string, value: string}[];
    editable?: boolean;
    onDelete: () => void;
    onChange?: (changes: ShortcutType) => void;
};
