"use client";

import { useState, useRef, useEffect } from "react";
import PageTitle from "@/components/pageTitle/PageTitle";
import styles from "./perfil.module.css";
import { GetUser } from "@/utils/GetUser";
import UserType from "@/types/UserTypes";
import { updateUser } from "@/utils/UserManagement";


const testUser: UserType = {
  id: "20",
  name: "John Smith",
  email: "john.smith@company.com",
  role: "admin",
}


export default function PerfilPage() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview"|"Settings"|"Security">("Overview");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);


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
    try {
      // Convertir imagen a base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          // Asegurarse de que el base64 incluya el prefijo de tipo de imagen
          const base64WithPrefix = `data:${file.type};base64,${base64.split(',')[1]}`;
          resolve(base64WithPrefix);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      if (!user?.id) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

      // Convertir el ID de string a número para la API
      const userId = parseInt(user.id, 10);
      if (isNaN(userId)) {
        throw new Error('ID de usuario inválido');
      }

      // Actualizar el usuario con la nueva imagen
      const updatedUserData = await updateUser(userId, {
        profilePicture: base64Image
      });

      if (!updatedUserData) {
        throw new Error('Error al actualizar la imagen de perfil');
      }

      const updatedUserType: UserType = {
        id: user.id, 
        name: updatedUserData.name,
        email: updatedUserData.email,
        role: updatedUserData.role,
        profilePicture: base64Image
      };

      // Actualizar el usuario localmente
      setUser(updatedUserType);
      
      // Actualizar el usuario en localStorage
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUserData = {
          ...currentUser,
          profilePicture: base64Image
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } catch (storageError) {
        console.error('Error updating localStorage:', storageError);
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
      if (!userData) {
        console.log("userData is null");
        return;
      }
      userData.id = "20"; //REMOVE WHEN LOGIN WORKS 
      console.log("userData", userData);
      setUser(userData);
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
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
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
                value={user?.name}
                onChange={e => user && setUser({...user, name: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={user?.email}
                onChange={e => user && setUser({...user, email: e.target.value})}
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