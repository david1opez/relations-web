import React from 'react';
import styles from './CallDetailsPopup.module.css';

interface Chapter {
    title: string;
    start_time: string;
    paragraphs: { time: string; text: string }[];
}

interface CallDetailsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    attendees: string[];
    date: string;
    duration: string;
    transcript: string;
    chapters?: Chapter[];
    summary?: string;
}

export default function CallDetailsPopup({
    isOpen,
    onClose,
    title,
    attendees,
    date,
    duration,
    transcript,
    chapters = [],
    summary = '',
}: CallDetailsPopupProps) {
    const [activeTab, setActiveTab] = React.useState<'resumen' | 'transcripcion'>('resumen');
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

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'resumen' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('resumen')}
                    >
                        Resumen
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'transcripcion' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('transcripcion')}
                    >
                        Transcripción
                    </button>
                </div>

                <div className={styles.tabContentContainer}>
                    {activeTab === 'resumen' ? (
                        <div className={styles.summary}>
                            <h3>Resumen de la Llamada:</h3>
                            <p>{summary || 'No hay resumen disponible.'}</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: 24 }}>
                            <div className={styles.transcriptionContainer} style={{ flex: 2, marginRight: 16 }}>
                                <h3>Transcripción:</h3>
                                {chapters.map((chapter, idx) => (
                                    <div key={idx} style={{ marginBottom: 16 }}>
                                        <strong>{chapter.title}</strong>
                                        <ul style={{ paddingLeft: 16 }}>
                                            {chapter.paragraphs.map((p, i) => (
                                                <li key={i}>
                                                    <span style={{ color: '#6CCDEA', fontWeight: 500 }}>{p.time}</span> - {p.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.timestamps} style={{ flex: 1 }}>
                                <h3>Timestamps:</h3>
                                <ul className={styles.list}>
                                    {chapters.map((chapter, idx) => (
                                        <li key={idx} className={styles.listItem}>
                                            <strong>{chapter.title}</strong>
                                            {chapter.paragraphs && chapter.paragraphs.length > 0 && (
                                                <div>
                                                    <span style={{ color: '#6CCDEA', fontWeight: 500 }}>{chapter.paragraphs[0].time}</span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}