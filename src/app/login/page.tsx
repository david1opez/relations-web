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

const CLIENT_ID = process.env.CLIENT_ID;
const TENANT = "common";
const SCOPE = "openid profile User.Read";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // OAuth Microsoft
  useEffect(() => {
    if (code) {
      fetch(
        `https://relations-data-api.vercel.app/msft-auth?code=${code}`,
        { method: "POST" }
      )
        .then((r) => r.json())
        .then((data: AuthResponse) => {
          router.push(`/home?at=${data.access_token}`);
        })
        .catch(console.error);
    }
  }, [code, router]);

  // Mientras validamos el código
  if (code) {
    return   <div className={styles.validating}>
    <span className="spinner"></span> Validando credenciales…
  </div>
  }

  return (
    <div className={styles.pageContainer}>
      {/* Logo en la esquina superior izquierda */}
      <img
        src="/images/neoris-logo.png"
        alt="Neoris logo"
        className={styles.logo}
      />

      <div className={styles.card}>
        {/* Título dentro de la tarjeta */}
        <h2 className={styles.cardTitle}>Iniciar sesión</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Ingrese su email"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
        />

        <button className={styles.loginBtn}>Iniciar sesión</button>

        <button
          onClick={handleMicrosoftLogin}
          className={styles.microsoftBtn}
        >
          <img
            src="/images/microsoft-logo.png"
            alt="Microsoft logo"
          />
          Iniciar sesion con Microsoft
        </button>

        <a href="#" className={styles.forgot}>
          ¿Olvidó su contraseña?
        </a>
      </div>
    </div>
  );

  function handleMicrosoftLogin() {
    window.location.href =
      `https://login.microsoftonline.com/${TENANT}` +
      `/oauth2/v2.0/authorize?client_id=${CLIENT_ID}` +
      `&response_type=code&redirect_uri=` +
      encodeURIComponent("https://relations-web.vercel.app/login") +
      `&response_mode=query&scope=${encodeURIComponent(SCOPE)}`;
  }
}