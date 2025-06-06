// UTILS
import { getUserFromLocalStorage } from "./users";

// TYPES
import { Stats } from "@/types/components/statsCardTypes";
import { Activity, RegisterActivityParams } from "@/types/activityTypes";

export async function getUserStats() {    
    try {
        const res = await fetch(`https://relations-data-api.vercel.app/activity/stats?uid=${getUserFromLocalStorage()?.uid}`)

        if (!res.ok) {
            throw new Error(`Failed to fetch user stats: ${res.status} ${res.statusText}`);
        }

        const data: Stats = await res.json();

        console.log("User stats fetched:", data);

        return data;
    } catch (error) {
        console.error("Error fetching user stats:", error);
        throw error;
    }
}

export async function getActivity(): Promise<Activity[]> {
    try {
        const uid = getUserFromLocalStorage()?.uid;
        if (!uid) throw new Error("Missing uid");

        const res = await fetch(`https://relations-data-api.vercel.app/activity/recent?uid=${uid}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch activity: ${res.status} ${res.statusText}`);
        }

        const data: { activities: Activity[] } = await res.json();

        return data.activities;
    } catch (error) {
        console.error("Error fetching activity:", error);
        throw error;
    }
}


export async function registerActivity({ action, projectID, callID }: RegisterActivityParams) {
    try {
        const uid = getUserFromLocalStorage()?.uid;
        
        if (!uid) throw new Error("Missing uid");

        const res = await fetch("https://relations-data-api.vercel.app/activity/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid,
                action,
                projectID,
                callID,
            })
        });

        if (!res.ok) {
            throw new Error(`Failed to register activity: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error registering activity:", error);
        throw error;
    }
}
