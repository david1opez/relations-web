// UTILS
import { getUser, updateEmptyUser, getUserFromLocalStorage, removeUserFromLocalStorage } from "./users";

// TYPES
import AuthResponse from "@/types/authTypes";
import { UserProfile } from "@/types/userTypes";

export async function authWithMicrosoft(code: string): Promise<AuthResponse> {
    const response = await fetch(
        `https://relations-api.vercel.app/auth?code=${code}`,
        { method: "POST" }
    )

    if (!response.ok) {
        throw new Error("Error al autenticar con Microsoft");
    }

    const data = await response.json() as AuthResponse;

    if (!data || !data.profile) {
        throw new Error("Datos de usuario no válidos");
    }

    return data;
}

export async function handleLogin(code: string): Promise<UserProfile | undefined> {
    try {
        const data = await authWithMicrosoft(code);
        if (data && data.profile) {
            const user = await getUser(data.profile.mail || '');
            if (user) {
                return user;
            }
            else {
                const newUser = await updateEmptyUser(data.profile);
                if (newUser) return newUser;
            }
        }
    } catch (error) {}

    return undefined;
}


const CLIENT_ID = process.env.MSFT_CLIENT_ID;
const REDIRECT_URI = process.env.MSFT_REDIRECT_URI;

const LoginRedirectUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=openid profile User.Read`;

export async function checkUserLoggedIn(): Promise<UserProfile | string> {
    const user = getUserFromLocalStorage();

    if (user) {
        try {
            const fetchedUser = await getUser(user.email);
            if (fetchedUser) {
                return fetchedUser;
            } else {
                removeUserFromLocalStorage();
                return LoginRedirectUrl;
            }
        } catch (error) {
            removeUserFromLocalStorage();
            return LoginRedirectUrl;
        }
    } else {
        return LoginRedirectUrl;
    }
}
