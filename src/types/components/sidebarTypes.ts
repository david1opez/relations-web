// TYPES
import { UserProfile } from "../userTypes";

type SidebarProps = {
    user: UserProfile | null;
    pages: SidebarItemOption[];
    activePage: string;
    onPageChange: (page: string) => void;
    onLogOut?: () => void;
};

export type SidebarItemOption = {
    icon: string;
    name: string;
}

export type SidebarItemProps = {
    icon: string;
    pageName: string;
    active?: boolean;
    onClick?: () => void;
};

export default SidebarProps;
