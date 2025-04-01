//TYPES
import { IconName } from "../Icon/Icon.interface";
import * as Pages from "../../app/Pages";

export type SidebarItemType = {
    icon: IconName;
    text: keyof typeof Pages;
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
