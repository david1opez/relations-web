import React from 'react';
import styles from './AssignProjectPopup.module.css';

interface AssignProjectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  attendees: string[];
  date: string;
  duration: string;
}

export default function AssignProjectPopup({
  isOpen,
  onClose,
  title,
  attendees,
  date,
  duration
}: AssignProjectPopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.667 10.667H5.333c-.736 0-1.333.597-1.333 1.333v13.333c0 .737.597 1.334 1.333 1.334h21.334c.736 0 1.333-.597 1.333-1.334V12c0-.736-.597-1.333-1.333-1.333z" stroke="#B4E1F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21.333 10.667V8c0-.736-.597-1.333-1.333-1.333h-8c-.736 0-1.333.597-1.333 1.333v2.667" stroke="#B4E1F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Título de la llamada:</h2>
            <p className={styles.callTitle}>{title}</p>
          </div>
        </div>

        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <span className={styles.label}>Asistentes:</span>
            <span className={styles.value}>{attendees.join(', ')}</span>
          </div>
          <div className={styles.metadataRow}>
            <div className={styles.metadataItem}>
              <span className={styles.label}>Fecha:</span>
              <span className={styles.value}>{date}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.label}>Duración:</span>
              <span className={styles.value}>{duration}</span>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Proyecto a asignar:</label>
          <select className={styles.select}>
            <option value="">Seleccionar proyecto...</option>
            {/* Aquí se agregarían las opciones de proyectos dinámicamente */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción de la llamada:</label>
          <textarea 
            className={styles.textarea} 
            placeholder="Escribe una descripción..."
            rows={4}
          />
        </div>

        <button className={styles.assignButton}>
          Asignar a proyecto
        </button>
      </div>
    </div>
  );
} 