"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// TYPES
type AuthResponse = {
    access_token: string;
    expires_in: number;
    ext_expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
}

export default function Login() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if(!code) {
            alert("No se ha proporcionado un código de autorización.");
            router.push("/");
        }

        fetch(`https://relations-data-api.vercel.app/msft-auth?code=${code}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then((data: AuthResponse) => {
            router.push(`/home?at=${data.access_token}`);
        })
        .catch(error => {
            console.error(error);
        });
    }, [code]);

    return (
        <div>
            Validando credenciales...
        </div>
    );
};
