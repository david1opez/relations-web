export type RegularStats = {
    activeProjects: number;
    analyzedCalls: number;
    totalProjects: number;
}

export type SupportStats = {
    totalSupportCalls: number;
    analyzedSupportCalls: number;
    solvedPercentage: number;
    positiveSentimentPercentage: number;
}

export type StatsCardProps = {
    icon: string;
    title: string;
    number?: number;
};
