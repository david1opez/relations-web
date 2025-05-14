// TYPES
import { Activity } from "@/types/ActivityCardTypes";

export default async function GetActivity(): Promise<Activity> {
    return new Promise<Activity>((resolve) => {
        resolve({
            activeProjects: 2,
            analyzedCalls: 5,
            teams: 3
        });
    });
};
