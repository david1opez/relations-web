"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

// COMPONENTS
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";

// UTILS
import { setUserInLocalStorage } from "@/utils/users";

// TYPES
import { handleLogin } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
        handleLogin(code)
        .then((user) => {
            if (user) {
                setUserInLocalStorage(JSON.stringify(user));
                setUserName(user.name);
                router.push(`/inicio`);
            }
        })
    }
  }, [code, router]);

  if(code) {
    return (
        <div className={styles.validating}>
            {
                userName ? (
                    <span>¡Bienvenido, {userName}!</span>
                ) : (
                    <div>
                        <ActivityIndicator />
                        <span className="spinner"></span> Validando credenciales…
                    </div>
                )
            }
        </div>
    )
  }
  else {
    return (
        <div className={styles.validating}>
            <ActivityIndicator />
            <span>Redirigiendo a Microsoft para iniciar sesión...</span>
        </div>
    )
  }
}