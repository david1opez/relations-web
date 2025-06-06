// TYPES
import { MicrosoftProfile } from "@/types/authTypes";
import type { UserProfile } from "@/types/userTypes";

// LOCAL STORAGE UTILS
export function getUserFromLocalStorage(): UserProfile | null {
    return JSON.parse(localStorage.getItem("user") || 'null');
}

export function setUserInLocalStorage(user: string): void {
    console.log("Setting user in localStorage:", user);
    localStorage.setItem("user", user);
}

export function removeUserFromLocalStorage(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
    }
}


// API UTILS
export async function getUser(email: string): Promise<UserProfile | null> {
    const response = await fetch(`https://relations-data-api.vercel.app/user/v2/users?email=${email}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch user data. Status: ${response.status} ${response.statusText}. Response: ${errorText}`);
        return null;
    }

    const user: UserProfile = await response.json();
    
    if (!user || !user.uid) {
        console.warn("User not found or UID is missing.");
        return null;
    }

    return user;
};

export async function createEmptyUser(userData: Omit<UserProfile, "userID" | "uid" | "profilePicture">): Promise<UserProfile | null> {
    const response = await fetch(`https://relations-data-api.vercel.app/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to create user. Status: ${response.status} ${response.statusText}. Response: ${errorText}`);
        return null;
    }

    const newUser: UserProfile = await response.json();
    
    return newUser;
}

export async function updateEmptyUser(userData: MicrosoftProfile): Promise<UserProfile | null> {
    console.log("Updating empty user with data:", userData);
    
    const response = await fetch(`https://relations-data-api.vercel.app/user/v2/users/assignUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid: userData.id,
            email: userData.mail,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update user. Status: ${response.status} ${response.statusText}. Response: ${errorText}`);
        return null;
    }

    const updatedUser: UserProfile = await response.json();
    
    return updatedUser;
}
