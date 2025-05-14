// TYPES
import { IconName } from "./IconTypes";

export type MetadataItemProps = {
    icon: IconName;
    title: string;
    value: string | number;
    color?: string;
    className?: string;
}
