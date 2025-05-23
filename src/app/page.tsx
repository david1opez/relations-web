"use client";
import styles from "./page.module.css";
import Image from "next/image";

// COMPONENTS
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundDecorationContainer}>
        <Image
          alt=""
          src="./images/background-decoration.svg"
          width={100}
          height={100}
          className={styles.decoration}
        />
        <Image
          alt=""
          src="./images/background-decoration.svg"
          width={100}
          height={100}
          className={styles.reverseDecoration}
        />
      </div>

      <Navbar/>

      <h1 className={styles.title}>
        Convierte tus llamadas en insights
      </h1>

      <p className={styles.description}>
        Con nuestro motor impulsado por IA extrae automáticamente los 
        requisitos de tus proyectos y analiza problemas técnicos de
        tu equipo
      </p>

      <div className={styles.cardsContainer}>
        <div className={styles.leftCard}>
          <Image
            alt=""
            src="./images/house.svg"
            width={100}
            height={100}
            className={styles.cardIllustration}
          />
          <h2 className={styles.cardTitle}>
            Análisis de proyectos
          </h2>
          <p className={styles.cardDescription}>
            Detecta automáticamente los requisitos de proyecto, generando
            resúmenes claros, estructurados y listos para tu equipo de
            propuesta.
          </p>
        </div>

        <div className={styles.rightCard}>
          <Image
            alt=""
            src="./images/phone.svg"
            width={100}
            height={100}
            className={styles.cardIllustration}
          />
          <h2 className={styles.cardTitle}>
            Análisis de soporte técnico
          </h2>
          <p className={styles.cardDescription}>
            Detecta automáticamente los requisitos de proyecto, generando
            resúmenes claros, estructurados y listos para tu equipo de
            propuesta.
          </p>
        </div>
      </div>

      <button
        className={styles.githubButton}
        onClick={() => {
          window.open('https://github.com/david1opez')
        }}
      >
        <Image
          alt=""
          src="./images/github-mark.svg"
          width={100}
          height={100}
          className={styles.githubLogo}
        />
        ¡Somos open source!
      </button>
    </div>
  );
}
