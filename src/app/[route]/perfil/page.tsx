"use client";

import { useState, useRef, useEffect } from "react";
import PageTitle from "@/components/pageTitle/PageTitle";
import styles from "./perfil.module.css";
import { GetUser } from "@/utils/GetUser";
import UserType from "@/types/UserTypes";

export default function PerfilPage() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview"|"Settings"|"Security">("Overview");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("john.smith@company.com");
  const [notifications, setNotifications] = useState(true);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten archivos JPEG, PNG y GIF');
      return;
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://relations-data-api.vercel.app/users/${user?.userID}/upload-profile-picture`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir la imagen');
      }

      const data = await response.json();
      
      // Actualizar el usuario localmente
      const updatedUser = await GetUser();
      setUser(updatedUser);
      
      // Actualizar el usuario en localStorage de manera más segura
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUserData = {
          ...currentUser,
          profilePicture: data.user.profilePicture // Cambio aquí para usar data.user
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } catch (storageError) {
        console.error('Error updating localStorage:', storageError);
        // No interrumpimos la experiencia del usuario si falla localStorage
      }

    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al subir la imagen');
    } finally {
      setLoading(false);
      // Limpiar el input file para permitir subir la misma imagen de nuevo si es necesario
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
};

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await GetUser();
      setUser(userData);
      if (userData) {
        setFullName(userData.name);
        setEmail(userData.email);
      }
    };
    loadUser();
  }, []);

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
          <div className={styles.avatarContainer} onClick={handleImageClick}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Avatar" className={styles.avatar}/>
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className={styles.uploadOverlay}>
              <span>Cambiar foto</span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div className={styles.userInfo}>
            <h2>{fullName}</h2>
            <p>{email}</p>
            <div className={styles.tags}>
              <span>{user?.role || 'Usuario'}</span>
            </div>
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
            {/*
            Unfinished, dont delete
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
            </div>*/}
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
            {/*
            Unfinished, dont delete
            <div className={styles.toggleGroup}>
               <div>
                <strong>Notificaciones por correo</strong>
                <span>Recibe actualizaciones sobre tus llamadas y actividades</span>
              </div> 
              <div
                className={`${styles.toggle} ${notifications ? styles.active : ""}`}
                onClick={() => setNotifications(!notifications)}
              />
            </div>*/}
          </div>
        )}
      </div>
    </div>
  );
}