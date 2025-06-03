import { IconName } from "./iconTypes";

export type PageHeaderProps = {
    icon: IconName;
    title: string;
    subpages?: string[];
    onPageChange?: (subpages: string[]) => void;
    onBack?: () => void;
};
