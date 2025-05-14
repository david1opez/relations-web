"use client"
import { useState, useEffect } from 'react';
import styles from './shortcut.module.css';
// import { useRouter } from 'next/navigation';

// COMPONENTS
import Icon from '@/components/icon/Icon';
import OptionsMenu from '@/components/optionsMenu/OptionsMenu';
import IconSelector from '@/components/iconSelector/IconSelector';
import Input from '@/components/input/Input';

// TYPES
import { ShortcutProps, ShortcutType } from '@/types/ShortcutTypes';

export default function Shortcut({ icon, id, title, redirect, editable, onDelete, onChange }: ShortcutProps) {
    // const router = useRouter();

    const [shortcutData, setShortcutData] = useState<ShortcutType>({ id, icon, title, redirect });
    const [isEditing, setIsEditing] = useState(editable || false);

    // const handleClick = () => {
    //     const redirectPath = shortcutData.redirect.map((item) => item.value).join('/');
    //     router.push(`/${redirectPath}`);
    // };

    const handleOptionSelect = (option: string) => {
        if (option.includes('Eliminar')) {
            onDelete();
        } else if (option.includes('Editar') || option.includes('Salir')) {
            setIsEditing(!isEditing);
        }
    }

    useEffect(() => {
        if(onChange) onChange(shortcutData);
    }, [shortcutData]);

    if(isEditing) {
        return (
            <div className={styles.container}>
                <IconSelector
                    label="Ícono"
                    value={shortcutData?.icon}
                    onChange={(icon) => setShortcutData({ ...shortcutData, icon })}
                />

                <div className={styles.inputsContainer}>
                    <Input
                        label="Nombre del acceso rápido:"
                        value={shortcutData?.title}
                        onChange={(title) => setShortcutData({ ...shortcutData, title })}
                    />

                    <p className={styles.label}>Redirige a:</p>
                    <div className={styles.redirectContainer}>
                        {/* {
                            shortcutData?.redirect.map((item, index) => (
                                <Dropdown key={index} value={item}/>
                            ))
                        } */}
                    </div>
                </div>

                <OptionsMenu
                    options={[
                        { icon: 'close', name: 'Eliminar acceso rápido' },
                        { icon: 'exit', name: 'Salir de edición' },
                    ]}
                    onSelect={handleOptionSelect}
                />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Icon
                name={shortcutData?.icon}
                size={24}
                color="var(--accent)"
            />

            <div>
                <p className={styles.title}>{shortcutData?.title}</p>
                <p className={styles.redirect}>Redirige a: {shortcutData?.redirect?.map(redirect => redirect.title).join(' / ')}</p>
            </div>

            <OptionsMenu
                options={[
                    { icon: 'close', name: 'Eliminar acceso rápido' },
                    { icon: 'pencil', name: 'Editar acceso rápido' }
                ]}
                onSelect={handleOptionSelect}
            />
        </div>
    );
};
