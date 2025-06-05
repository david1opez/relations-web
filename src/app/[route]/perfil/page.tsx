"use client";

import { useState, useRef, useEffect } from "react";
import PageTitle from "@/components/pageTitle/PageTitle";
import styles from "./perfil.module.css";
import { GetUser } from "@/utils/GetUser";
import {UserProfile} from "@/types/UserTypes";
import { updateUser } from "@/utils/UserManagement";
import { translateRole } from "@/utils/roleUtils";

export default function PerfilPage() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"Overview"|"Settings"|"Security">("Settings");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string>("");


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

      if (!user?.userID) {
        throw new Error('No se pudo obtener el ID del usuario');
      }

      // Actualizar el usuario con la nueva imagen
      const updatedUserData = await updateUser(user.userID, {
        profilePicture: base64Image
      });

      if (!updatedUserData) {
        throw new Error('Error al actualizar la imagen de perfil');
      }

      const updatedUserType : UserProfile = {
        ...user,
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

  const handleSaveName = async () => {
    if (!user?.userID) {
      setError('No se pudo obtener el ID del usuario');
      return;
    }

    if (!tempName.trim()) {
      setError('El nombre no puede estar vacío');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Actualizar el usuario con el nuevo nombre
      const updatedUserData = await updateUser(user.userID, {
        name: tempName
      });

      if (!updatedUserData) {
        throw new Error('Error al actualizar el nombre');
      }

      const updatedUserType: UserProfile = {
        ...user,
        name: updatedUserData.name
      };

      // Actualizar el usuario localmente
      setUser(updatedUserType);
      setIsEditing(false);
      setSuccess('Nombre actualizado correctamente');
      
      // Actualizar el usuario en localStorage
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUserData = {
          ...currentUser,
          name: tempName
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } catch (storageError) {
        console.error('Error updating localStorage:', storageError);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error al actualizar el nombre');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await GetUser();
      if (!userData) {
        console.log("userData is null");
        return;
      }
      setUser(userData);
      setTempName(userData.name || "");
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
            accept="image/jpeg,image/png,image/gif"
            style={{ display: 'none' }}
            title="Selecciona una imagen (JPG, PNG o GIF) de máximo 5MB"
            disabled={loading}
          />
          <div className={styles.userInfo}>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <div className={styles.tags}>
              <span>{translateRole(user?.role)}</span>
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className={styles.tabs}>
          {[
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
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}
            <div className={styles.inputGroup}>
              <label>Nombre completo</label>
              <div className={styles.nameInputContainer}>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={isEditing ? tempName : (user?.name || '')}
                  onChange={e => setTempName(e.target.value)}
                  disabled={!isEditing}
                />
                {!isEditing ? (
                  <button 
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </button>
                ) : (
                  <div className={styles.editButtons}>
                    <button 
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsEditing(false);
                        setTempName(user?.name || "");
                        setError(null);
                      }}
                    >
                      Cancelar
                    </button>
                    <button 
                      className={styles.saveButton}
                      onClick={handleSaveName}
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={user?.email || ''}
                disabled
                className={styles.disabledInput}
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