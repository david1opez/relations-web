import React from 'react';
import styles from './CallDetailsPopup.module.css';

interface CallDetailsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    attendees: string[];
    date: string;
    duration: string;
    transcript: string;
}

export default function CallDetailsPopup({
    isOpen,
    onClose,
    title,
    attendees,
    date,
    duration,
    transcript
}: CallDetailsPopupProps) {
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
                    <div className={styles.titleSection}>
                        <span className={styles.titleLabel}>Título de la llamada:</span>
                        <h2 className={styles.title}>{title}</h2>
                    </div>
                    
                    <div className={styles.metadataSection}>
                        <div className={styles.metadataRow}>
                            <span className={styles.label}>Asistentes:</span>
                            <span className={styles.value}>{attendees.join(', ')}</span>
                        </div>
                        <div className={styles.dateTimeRow}>
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
                </div>

                <div className={styles.transcriptionContainer}>
                    <p className={styles.transcription}>{transcript}</p>
                </div>
            </div>
        </div>
    );
}