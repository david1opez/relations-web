"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

// UTILS
import { Login } from "@/utils/GetUser";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Image
        src="/images/blue-house.svg"
        alt="House" width={100}
        height={100}
      />
      <button
        onClick={() =>{
          Login();
          router.push("/inicio");
        }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
