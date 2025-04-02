
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // 👉 Solo hacemos fetch si hay "code"
  useEffect(() => {
    if (code) {
      fetch(
        `https://relations-data-api.vercel.app/msft-auth?code=${code}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data: AuthResponse) => {
          router.push(`/home?at=${data.access_token}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [code]);

  // 👉 Esta función se llama solo si el usuario hace clic
  const handleMicrosoftLogin = () => {
    window.location.href =
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=df25bb12-928b-4419-9a5a-2665b0f16497&response_type=code&redirect_uri=http://localhost:3000/login&response_mode=query&scope=openid%20profile%20email%20offline_access&state=12345";
  };

  // ✅ Mostrar pantalla de carga solo si viene de Microsoft
  if (code) {
    return <div className={styles.validating}>Validando credenciales...</div>;
  }

  // ✅ Mostrar interfaz completa al entrar normalmente
  return (
    <div className={styles.container}>
      <img src="/images/neoris-logo.png" alt="Neoris logo" className={styles.logo} />

      <div className={styles.card}>
        <h2>Iniciar sesión</h2>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Ingrese su email" />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
        />

        <button className={styles.loginBtn}>Iniciar sesión</button>

        <button onClick={handleMicrosoftLogin} className={styles.microsoftBtn}>
          <img src="/images/microsoft-logo.png" alt="Microsoft logo" />
          Iniciar sesión con Microsoft
        </button>

        <a href="#" className={styles.forgot}>
          ¿Olvidó su contraseña?
        </a>
      </div>
    </div>
  );
}
