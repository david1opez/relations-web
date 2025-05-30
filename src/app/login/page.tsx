"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./login.module.css";
import { Login } from "@/utils/GetUser";

// TYPES
type AuthResponse = {
  profile: {
    "@odata.context": string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    id: string;
    jobTitle: string | null;
    mail: string | null;
    mobilePhone: string | null;
    officeLocation: string | null;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
  };
  tokens: {
    access_token: string;
    expires_in: number;
    ext_expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
  };
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [userData, setUserData] = useState<AuthResponse | null>(null);

  useEffect(() => {
    if (code) {
      fetch(
        `https://relations-data-api.vercel.app/msft-auth?code=${code}`,
        { method: "POST" }
      )
        .then((r) => r.json())
        .then((data: AuthResponse) => {
          setUserData(data);

          localStorage.setItem("user", JSON.stringify(data.profile));

          console.log("User data:", data);

          setTimeout(() => {
            router.push("/proyectos");
          }, 2000);
        })
        .catch(console.error);
    }
  }, [code, router]);

  if (code) {
    if (userData) {
      return (
      <div className={styles.validating}>
        <span>¡Bienvenido, {userData.profile.displayName}!</span>
      </div>
      );
    }
    return (
      <div className={styles.validating}>
      <span className="spinner"></span> Validando credenciales…
      </div>
    );
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