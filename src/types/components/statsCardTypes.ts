export type Stats = {
    activeProjects: number;
    analyzedCalls: number;
    totalProjects: number;
}

export type StatsCardProps = {
    icon: string;
    title: string;
    number?: number;
};
