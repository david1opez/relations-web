import { useEffect, useState } from 'react';
import styles from './shortcuts.module.css';

// COMPONENTS
import Shortcut from './shortcut/Shortcut';

// UTILS
import { GetShortcuts, UpdateShortcuts } from '@/utils/Shortcuts';

// TYPES
import { ShortcutType } from '@/types/ShortcutTypes';

export default function ShortcutsSection() {
    const [shortcuts, setShortcuts] = useState<ShortcutType[]>([]);

    const [shortcutsChanged, setShortcutsChanged] = useState(false);

    const handleAddShortcut = () => {
        const newShortcut: ShortcutType = {
            id: (Math.random().toString(36).substring(2, 15)),
            icon: 'rocket',
            title: 'Nuevo acceso rápido',
            redirect: [],
            editable: true,
        };

        setShortcuts([newShortcut, ...shortcuts]);
        setShortcutsChanged(true);
    };

    const handleSaveShortcuts = async () => {
        const updatedShortcuts = shortcuts?.map((shortcut) => ({...shortcut, editable: false}));

        UpdateShortcuts(updatedShortcuts);
        setShortcuts(updatedShortcuts);
        setShortcutsChanged(false);
    };

    const handleEditShortcut = (id: string, data: ShortcutType) => {
        const newShortcuts = shortcuts?.map((shortcut) => {
            if (shortcut.id === id) {
                return { ...shortcut, ...data };
            }
            return shortcut;
        });

        setShortcuts(newShortcuts);
        setShortcutsChanged(true);
    };

    const handleDeleteShortcut = (index: number) => {
        const newShortcuts = [...shortcuts];

        newShortcuts.splice(index, 1);

        setShortcuts(newShortcuts);
        setShortcutsChanged(true);
    };

    useEffect(() => {
        GetShortcuts()
        .then((data) => setShortcuts(data))
        .catch((error) => {
            console.error("Error fetching shortcuts data:", error);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Acceso rápido</h2>
            <p className={styles.description}>Accede rápidamente a las funciones más utilizadas</p>

            <div className={styles.shortcutsItemsContainer}>
                {
                    shortcuts?.map((item, index) => (
                        <Shortcut
                            key={item?.id}
                            id={item?.id}
                            icon={item.icon}
                            title={item.title}
                            redirect={item.redirect}
                            editable={item?.editable}
                            onDelete={() => handleDeleteShortcut(index)}
                            onChange={(data) => handleEditShortcut(item?.id, data)}
                        />
                    ))
                }
            </div>

            <div className={styles.buttonsContainer}>
                <button
                    className={shortcutsChanged ? styles.addButton : styles.saveButton}
                    onClick={() => handleAddShortcut()}
                >
                    Agregar acceso rápido
                </button>

                {
                    shortcutsChanged && (
                        <button
                            className={styles.saveButton}
                            onClick={() => handleSaveShortcuts()}
                        >
                            Guardar cambios
                        </button>
                    )
                }
                
            </div>
        </div>
    );
}