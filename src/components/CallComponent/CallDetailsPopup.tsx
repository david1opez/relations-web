import React from 'react';
import styles from './CallDetailsPopup.module.css';

interface CallDetailsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CallDetailsPopup({ isOpen, onClose }: CallDetailsPopupProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            {/* Caja de Detalles */}
            <div className={styles.details}>
                {/* Icono de cierre */}
                <div className={styles.closeIcon} onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 31 31"
                        fill="none"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M24.2188 6.78125L6.78125 24.2188"
                            stroke="#6CCDEA"
                            strokeWidth="3.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24.2188 24.2188L6.78125 6.78125"
                            stroke="#6CCDEA"
                            strokeWidth="3.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <h2 className={styles.title}>Detalles de la Llamada:</h2>
                <p><strong>Título:</strong> Discusión sobre diseño de dashboard</p>
                <p><strong>Asistentes:</strong> Rosalinda Vazquez, Irma Galindo, Antonio Mellado</p>
                <p><strong>Duración:</strong> 49 m 7s</p>
                <p><strong>Fecha:</strong> 08/Feb/2025</p>
                <p><strong>Hora:</strong> 12:05 p.m. - 12:55 p.m.</p>
            </div>

            {/* Caja de Resumen */}
            <div className={styles.summary}>
                <h2 className={styles.title}>Resumen de la Llamada:</h2>
                <p><strong>Iván Jair Garza</strong> (6:13 - 7:09)</p>
                <p>Nam at ultricies nunc. Curabitur ut dolor erat.</p>
                <p><strong>David Herrera</strong> (6:13 - 7:09)</p>
                <p>Nam at ultricies nunc. Curabitur ut dolor erat.</p>
            </div>

            {/* Caja de Timestamps */}
            <div className={styles.timestamps}>
                <h2 className={styles.title}>Timestamps:</h2>
                <ul className={styles.list}>
                    <li>➡️ <a href="#" className={styles.link}>Bienvenido (0:00 - 1:32)</a></li>
                    <li>➡️ <a href="#" className={styles.link}>Explicación del flujo de trabajo (0:00 - 1:32)</a></li>
                    <li>➡️ <a href="#" className={styles.link}>Agradecimientos (0:00 - 1:32)</a></li>
                    <li>➡️ <a href="#" className={styles.link}>Agradecimientos (0:00 - 1:32)</a></li>
                    <li>➡️ <a href="#" className={styles.link}>Agradecimientos (0:00 - 1:32)</a></li>
                </ul>
            </div>
        </div>
    );
}