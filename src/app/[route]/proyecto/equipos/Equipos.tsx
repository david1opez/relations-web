"use client";

import styles from "./equipos.module.css";
import Icon from "@/components/icon/Icon";

export default function Equipos({ id }: { id: number }) {
  return (
    <div className={styles.container}>
      <div className={styles.teamHeader}>
        <p className={styles.label}>Nombre del equipo:</p>
        <div className={styles.teamTitleContainer}>
          <h2 className={styles.teamTitle}>Equipo Frontend</h2>
          <button className={styles.editButton}>
            <Icon name="pencil" size={18} color="#6CCDEA" />
          </button>
        </div>
        <p className={styles.teamLeader}>Líder: María García</p>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.headerItem}>Nombre</p>
          <p className={styles.headerItem}>Posición</p>
          <p className={styles.headerItem}>Contacto</p>
        </div>

        <div className={styles.tableBody}>
          {/* Miembros */}
          <div className={styles.tableRow}>
            <div className={styles.nameCell}>
              <Icon name="star" size={16} color="#6CCDEA" />
              María Rodríguez García
            </div>
            <p className={styles.bodyItem}>Desarrollador Frontend</p>
            <div className={styles.contactCell}>
              <a href="mailto:carlos.rodriguez@neoris.com" target="_blank" rel="noopener noreferrer">
                carlos.rodriguez@neoris.com
              </a>
              <Icon name="link" size={16} color="#6CCDEA" />
            </div>
          </div>

          <div className={styles.tableRow}>
            <div className={styles.nameCell}>
              <Icon name="star" size={16} color="#6CCDEA" />
              Carlos Rodríguez García
            </div>
            <p className={styles.bodyItem}>Diseñadora UI/UX</p>
            <div className={styles.contactCell}>
              <a href="mailto:ana.martinez@neoris.com" target="_blank" rel="noopener noreferrer">
                ana.martinez@neoris.com
              </a>
              <Icon name="link" size={16} color="#6CCDEA" />
            </div>
          </div>

          <div className={styles.tableRow}>
            <div className={styles.nameCell}>
              <Icon name="star" size={16} color="#6CCDEA" />
              David Rodríguez García
            </div>
            <p className={styles.bodyItem}>Desarrollador Frontend</p>
            <div className={styles.contactCell}>
              <a href="mailto:carlos.rodriguez@neoris.com" target="_blank" rel="noopener noreferrer">
                carlos.rodriguez@neoris.com
              </a>
              <Icon name="link" size={16} color="#6CCDEA" />
            </div>
          </div>

          <div className={styles.tableRow}>
            <div className={styles.nameCell}>
              <Icon name="star" size={16} color="#6CCDEA" />
              Carlos Rodríguez García
            </div>
            <p className={styles.bodyItem}>Diseñadora UI/UX</p>
            <div className={styles.contactCell}>
              <a href="mailto:juan.perez@neoris.com" target="_blank" rel="noopener noreferrer">
                juan.perez@neoris.com
              </a>
              <Icon name="link" size={16} color="#6CCDEA" />
            </div>
          </div>

          {/* Agregar miembro */}
          <div className={styles.addMemberRow}>
            <button className={styles.addMemberButton}>
              <Icon name="plus" size={16} color="#6CCDEA" />
              Agregar miembro
            </button>
          </div>
        </div>
      </div>

      <div className={styles.saveButtonContainer}>
        <button className={styles.saveButton}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}