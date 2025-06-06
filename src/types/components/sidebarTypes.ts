// TYPES
import type { UserProfile } from "@/types/userTypes";
import type { IconName } from '@/types/IconTypes';

type SidebarProps = {
    user: UserProfile | null;
    pages: SidebarItemOption[];
    activePage: string;
    onPageChange: (page: string) => void;
    onLogOut?: () => void;
};

export type SidebarItemOption = {
    icon: IconName;
    name: string;
}

export type SidebarItemProps = {
    icon: IconName;
    pageName: string;
    active?: boolean;
    onClick?: () => void;
};

export default SidebarProps;
