"use client";

import { useState } from "react";
import PageTitle from "@/components/pageTitle/PageTitle";
import styles from "./perfil.module.css";

export default function PerfilPage() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview"|"Settings"|"Security">("Overview");

  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("john.smith@company.com");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pageContainer">
      <PageTitle
        icon="user"
        title="Perfil"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      <div className={styles.container}>
        {/* Header de usuario */}
        <div className={styles.userHeader}>
          <img src="/images/profile.jpg" alt="Avatar" className={styles.avatar}/>
          <div className={styles.userInfo}>
            <h2>{fullName}</h2>
            <p>{email}</p>
            <div className={styles.tags}>
              <span>Ventas</span>
              <span>Gerente</span>
            </div>
            <span className={styles.lastLogin}>Último ingreso: 24/2/2024 09:15 AM</span>
          </div>
        </div>

        {/* Pestañas */}
        <div className={styles.tabs}>
          {[
            { label: "Resumen", key: "Overview" },
            { label: "Configuración", key: "Settings" },
          ].map(t => (
            <span
              key={t.key}
              className={`${styles.tab} ${activeTab === t.key ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(t.key as any)}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Contenido de cada pestaña */}
        {activeTab === "Overview" && (
          <>
            <div className={styles.metrics}>
              <div className={styles.card}>
                <p>Llamadas (7d)</p>
                <h3>156</h3>
                <small>⬈ 8% vs semana anterior</small>
              </div>
              <div className={styles.card}>
                <p>Sentimiento promedio</p>
                <h3>8.9</h3>
                <small>⬈ 2.1% vs mes anterior</small>
              </div>
              <div className={styles.card}>
                <p>Duración promedio</p>
                <h3>42:15</h3>
                <small className={styles.negative}>⬊ 3% vs mes anterior</small>
              </div>
            </div>
            <div className={styles.activity}>
              <h4>Actividad reciente</h4>
              <ul>
                <li>
                  <strong>Llamada con Soporte</strong>
                  <p>Revisión de proyecto con el equipo de desarrollo</p>
                  <span>45 minutos • hace 2 horas</span>
                </li>
                <li>
                  <strong>Capacitación</strong>
                  <p>Técnicas avanzadas de ventas y negociación</p>
                  <span>2 horas • hace 1 día</span>
                </li>
                <li>
                  <strong>Llamada con Ventas</strong>
                  <p>Sincronización semanal del equipo</p>
                  <span>30 minutos • hace 2 días</span>
                </li>
              </ul>
            </div>
          </>
        )}

        {activeTab === "Settings" && (
          <div className={styles.settings}>
            <h4>Configuración de perfil</h4>
            <div className={styles.inputGroup}>
              <label>Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.toggleGroup}>
              <div>
                <strong>Notificaciones por correo</strong>
                <span>Recibe actualizaciones sobre tus llamadas y actividades</span>
              </div>
              <div
                className={`${styles.toggle} ${notifications ? styles.active : ""}`}
                onClick={() => setNotifications(!notifications)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}