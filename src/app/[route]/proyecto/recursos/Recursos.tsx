"use client";

import { useState } from "react";
import styles from "./recursos.module.css";
import Icon from "@/components/icon/Icon";
import { createReport } from "@/services/reportsService";

interface Resource {
  title: string;
  link: string;
}

export default function Recursos({ id }: { id: number }) {
  const [resources, setResources] = useState<Resource[]>(() => {
    // Cargar recursos desde localStorage al iniciar
    if (typeof window !== 'undefined') {
      const savedResources = localStorage.getItem(`project-${id}-resources`);
      return savedResources ? JSON.parse(savedResources) : [];
    }
    return [];
  });
  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddResource = async () => {
    console.log('Iniciando handleAddResource');
    if (newTitle.trim() && newLink.trim()) {
      console.log('Condición del if cumplida');
      try {
        console.log('Entrando al try block');
        const newResourceData = {
          reportType: newTitle,
          fileURL: newLink,
          projectID: id,
        };

        console.log('Intentando guardar recurso:', newResourceData);

        const createdReport = await createReport(newResourceData);
        
        const newResources = [...resources, { title: createdReport.reportType, link: createdReport.fileURL }];
        setResources(newResources);
        
        // Guardar en localStorage
        localStorage.setItem(`project-${id}-resources`, JSON.stringify(newResources));
        
        setNewTitle("");
        setNewLink("");
        setIsAdding(false);
        
        console.log('Recurso guardado con éxito:', createdReport);

      } catch (error) {
        console.error('Error al guardar el recurso:', error);
        alert('Error al guardar el recurso. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Sección Recursos globales */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recursos globales del proyecto</h2>
        <p className={styles.sectionSubtitle}>Enlaces a herramientas y documentación</p>

        <div className={styles.resourceCard}>
          <div className={styles.iconCircle}>
            <Icon name="link" size={20} color="#6CCDEA" />
          </div>
          <div className={styles.resourceInfo}>
            <h3 className={styles.resourceTitle}>Repositorio Frontend</h3>
            <p className={styles.resourceLink}>Redirige a: https://github.com/neoris/repo-front</p>
          </div>
        </div>
      </div>

      {/* Sección Recursos de equipo */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recursos de equipo</h2>
        <p className={styles.sectionSubtitle}>Enlaces a herramientas y documentación</p>

        <div className={styles.resourcesRow}>
          {/* Recursos agregados */}
          {resources.map((res, idx) => (
            <div key={idx} className={styles.resourceCard}>
              <div className={styles.iconCircle}>
                <Icon name="link" size={20} color="#6CCDEA" />
              </div>
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>{res.title}</h3>
                <p className={styles.resourceLink}>Redirige a: {res.link}</p>
              </div>
            </div>
          ))}

          {/* Formulario de nuevo recurso */}
          {isAdding && (
            <div className={styles.newResourceCard}>
              <div className={styles.newResourceField}>
                <label>Título del recurso:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enlace de Figma"
                />
              </div>
              <div className={styles.newResourceField}>
                <label>Redirige a:</label>
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <button className={styles.saveButton} onClick={handleAddResource}>
                Guardar recurso
              </button>
            </div>
          )}

          {/* Botón de agregar recurso */}
          {!isAdding && (
            <button className={styles.addResourceBtn} onClick={() => setIsAdding(true)}>
              <Icon name="plus" size={20} color="#6CCDEA" />
              Agregar recurso
            </button>
          )}
        </div>
      </div>
    </div>
  );
}