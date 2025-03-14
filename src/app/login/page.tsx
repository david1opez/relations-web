"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        fetch(`https://relations-data-api/msft-auth?code=${code}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.error(error);
        })
    }, [code]);

    return (
        <div></div>
    );
};
