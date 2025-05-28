"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./login.module.css";

// TYPES
type AuthResponse = {
  access_token: string;
  expires_in: number;
  ext_expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetch(
        `https://relations-data-api.vercel.app/msft-auth?code=${code}`,
        { method: "POST" }
      )
        .then((r) => r.json())
        .then((data: AuthResponse) => {
          console.log("Auth response:", data);
          // router.push(`/home?at=${data.access_token}`);
        })
        .catch(console.error);
    }
  }, [code, router]);

  if (code) {
    return   <div className={styles.validating}>
    <span className="spinner"></span> Validando credenciales…
  </div>
  }

  return (
    <div className={styles.pageContainer}>
      <img
        src="/images/neoris-logo.png"
        alt="Neoris logo"
        className={styles.logo}
      />
    </div>
  );
}