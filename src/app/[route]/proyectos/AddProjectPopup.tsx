import React, { useState } from "react";
import styles from "./AddProjectPopup.module.css";

interface AddProjectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function AddProjectPopup({ isOpen, onClose, onProjectAdded }: AddProjectPopupProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aquí iría la lógica para guardar el proyecto (API call)
    setTimeout(() => {
      setLoading(false);
      onProjectAdded();
    }, 1000);
  };

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
            <h2 className={styles.title}>Agregar Proyecto</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre del proyecto</label>
            <input className={styles.input} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción</label>
            <textarea className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente</label>
            <input className={styles.input} value={client} onChange={e => setClient(e.target.value)} />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de inicio</label>
              <input className={styles.input} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de entrega</label>
              <input className={styles.input} type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <button className={styles.addButton} type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Agregar Proyecto"}
          </button>
        </form>
      </div>
    </div>
  );
} 