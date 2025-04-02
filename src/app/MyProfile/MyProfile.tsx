"use client";

import { useState } from 'react';
import styles from './MyProfile.module.css';
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function MyProfile() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Settings' | 'Security'>('Overview');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={styles.pageContainer}>
    <div style={{ marginLeft: '20px' }}>
        <PageIndicator
            icon="user"
            title="Perfil"
            subpages={subpages}
            onPageChange={setSubpages}
        />
        </div>

      <div className={styles.container}>
        {/* Header de usuario */}
        <div className={styles.userHeader}>
        <img
          src="/images/profile.jpg"
          alt="Foto de perfil"
          className={styles.avatar}
        />
          <div className={styles.userInfo}>
            <h2>John Smith</h2>
            <p>john.smith@company.com</p>
            <div className={styles.tags}>
              <span>Departamento de Ventas</span>
              <span>Gerente</span>
            </div>
            <small>Último inicio de sesión: 24/2/2024, 09:15 AM</small>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {[
            { label: 'Resumen', key: 'Overview' },
            { label: 'Configuración', key: 'Settings' },
            { label: 'Seguridad', key: 'Security' },
          ].map((tab) => (
            <span
              key={tab.key}
              className={activeTab === tab.key ? styles.activeTab : ''}
              onClick={() => setActiveTab(tab.key as 'Overview' | 'Settings' | 'Security')}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Overview Section */}
        {activeTab === 'Overview' && (
          <>
            <div className={styles.metrics}>
              <div className={styles.card}>
                <p>Llamadas (7 Días)</p>
                <h3>156</h3>
                <small>⬈ 8% aumento</small>
              </div>
              <div className={styles.card}>
                <p>Sentimiento Promedio</p>
                <h3>8.9</h3>
                <small>⬈ 2.1% aumento</small>
              </div>
              <div className={styles.card}>
                <p>Duración Total</p>
                <h3>42:15</h3>
                <small>⬊ -3% disminución</small>
              </div>
            </div>

            <div className={styles.activity}>
              <h4>Actividad Reciente</h4>
              <ul>
                <li>
                  <strong>Llamada</strong>
                  <p>Reunión con Cliente - Revisión de Proyecto</p>
                  <span>45 min • hace 2h</span>
                </li>
                <li>
                  <strong>Capacitación</strong>
                  <p>Taller de Técnicas de Ventas</p>
                  <span>2h • hace 1 día</span>
                </li>
                <li>
                  <strong>Llamada</strong>
                  <p>Sincronización de Equipo</p>
                  <span>30 min • hace 2 días</span>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Settings Section */}
        {activeTab === 'Settings' && (
          <div className={styles.settings}>
            <h4>Configuración Esencial</h4>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div>
                <strong>Notificaciones</strong>
                <span>Recibe actualizaciones importantes</span>
              </div>
              <div
                className={`${styles.toggle} ${notifications ? styles.active : ''}`}
                onClick={() => setNotifications(!notifications)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div>
                <strong>Modo Oscuro</strong>
                <span>Usar tema oscuro</span>
              </div>
              <div
                className={`${styles.toggle} ${darkMode ? styles.active : ''}`}
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        )}

        {/* Security Section */}
        {activeTab === 'Security' && (
            <div className={styles.settings}>
                <h4>Configuración de Seguridad</h4>

                <div className={styles.inputGroup}>
                <label htmlFor="currentPass">Contraseña Actual</label>
                <input
                    type="password"
                    id="currentPass"
                    placeholder="Ingresa tu contraseña actual"
                />
                </div>

                <div className={styles.inputGroup}>
                <label htmlFor="newPass">Nueva Contraseña</label>
                <input
                    type="password"
                    id="newPass"
                    placeholder="Ingresa tu nueva contraseña"
                />
                </div>

                <div className={styles.inputGroup}>
                <label htmlFor="confirmPass">Confirmar Nueva Contraseña</label>
                <input
                    type="password"
                    id="confirmPass"
                    placeholder="Confirma tu nueva contraseña"
                />
                </div>

                <div className={styles.toggleGroup}>
                <div>
                    <strong>Autenticación de Dos Factores</strong>
                    <span>Habilitar autenticación de dos factores</span>
                </div>
                <div className={styles.toggle} />
                </div>
            </div>
            )}
      </div>
    </div>
  );
}