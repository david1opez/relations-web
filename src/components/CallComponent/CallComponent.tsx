import React, { useState } from 'react';
import styles from './callComponent.module.css';

// COMPONENTS
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import CallDetailsPopup from './CallDetailsPopup'; // El punto (.) indica la carpeta actual

// TYPES
import { CallComponentProps } from './callComponent.interface';

export default function CallComponent({ call }: CallComponentProps) {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <Icon
                        name="phone"
                        size={20}
                        color='var(--black)'
                    />
                </div>
                <div className={styles.titleContainer}>
                    <h3 className={styles.title}>Discusión sobre diseño de dashboard</h3>
                    <p className={styles.attendees}>Rosalinda Vazquez, Irma Galindo, Antonio Mellado</p>
                </div>
                <div className={styles.durationContainer}>
                    <p className={styles.duration}>49 m 7s</p>
                    <p className={styles.date}>08/Feb/2025</p>
                </div>
                <Button text="Más detalles" onClick={handleOpenPopup} />
            </div>

            {/* Popup de detalles */}
            <CallDetailsPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </>
    );
};