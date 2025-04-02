//TYPES
import { IconName } from "../Icon/Icon.interface";
import * as Pages from "../../app/Pages";

export type SidebarItemType = {
    icon: IconName;
    page: keyof typeof Pages;
    text: string;
};

export type SidebarProps = {
    activeTab: keyof typeof Pages;
    onTabChange: (tab: keyof typeof Pages) => void;
};

export type SidebarItemProps = {
    icon: IconName;
    text: string;
    active: boolean;
    onClick?: () => void;
};
