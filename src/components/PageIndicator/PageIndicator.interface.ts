import { IconName } from "../Icon/Icon.interface";

export type PageIndicatorProps = {
    icon: IconName;
    title: string;
    subpages: string[];
    onPageChange?: (subpages: string[]) => void;
};
