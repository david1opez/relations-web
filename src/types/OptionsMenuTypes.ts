// TYPES
import { IconName } from "./IconTypes"

export type OptionsMenuProps = {
    options: {
        icon: IconName,
        name: string,
    }[];
    onSelect: (option: string) => void;
}
