export type Activity = {
    activeProjects: number;
    analyzedCalls: number;
    teams: number;
}

export type ActivityCardProps = {
    icon: string;
    title: string;
    number?: number;
};
