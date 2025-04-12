// TYPES
import { IconName } from "./IconTypes";

export type SidebarItemType = {
    icon: IconName;
    name: string;
}

export type SidebarProps = {
    onPageChange: (page: string) => void;
}

export type SidebarItemProps = {
    icon: IconName;
    pageName: string;
    active?: boolean;
    onClick?: () => void;
}
