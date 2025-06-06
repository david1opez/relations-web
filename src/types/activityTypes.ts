export type Activity = {
    username: string;
    date: string;
    action: string;
    where: string | null;
};

export type RegisterActivityParams = {
    action: string;
    projectID?: number | null;
    callID?: number | null;
};
