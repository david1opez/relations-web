import { IconName } from "@/types/IconTypes";

export type PageTitleProps = {
    icon: IconName;
    title: string;
    subpages: string[];
    onPageChange?: (subpages: string[]) => void;
    onBack?: () => void;
};
