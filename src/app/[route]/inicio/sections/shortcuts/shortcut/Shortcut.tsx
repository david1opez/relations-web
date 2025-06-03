"use client"
import { useState, useEffect } from 'react';
import styles from './shortcut.module.css';
import { useRouter } from 'next/navigation';

// COMPONENTS
import Icon from '@/components/icon/Icon';
import OptionsMenu from '@/components/optionsMenu/OptionsMenu';
import IconSelector from '@/components/iconSelector/IconSelector';
import Input from '@/components/input/Input';
import Dropdown from '@/components/dropdown/Dropdown';

// TYPES
import { ShortcutProps, ShortcutType } from '@/types/ShortcutTypes';
import Proyecto from '@/app/[route]/proyecto/Proyecto';

export default function Shortcut({ icon, id, title, redirect, editable, onDelete, onChange }: ShortcutProps) {
    const router = useRouter();

    const [shortcutData, setShortcutData] = useState<ShortcutType>({ id, icon, title, redirect });
    const [isEditing, setIsEditing] = useState(editable || false);
    const [shortcutOptions, setShortcutOptions] = useState<{[key: string]: { initialValue: { title: string; value: string }; options: Array<Array<{ title: string; value: string }>> }}>({
        'Inicio': {
            initialValue: {title: 'Inicio', value: 'inicio'},
            options: []
        },
        'Proyectos': {
            initialValue: {title: 'Proyectos', value: 'proyectos'},
            options: [
                [
                    { title: 'Proyecto 1', value: '3498tyrweiuohdskvjl' },
                    { title: 'Proyecto 2', value: '3498tyrweiuohdskvjl' },
                ],
                [
                    { title: 'Información', value: 'información' },
                    { title: 'Miembros', value: 'miembros' },
                    { title: 'Llamadas', value: 'llamadas' },
                    { title: 'Recursos', value: 'recursos' },
                ]
            ]
        },
        'Llamadas': {
            initialValue: {title: 'Llamadas', value: 'llamadas'},
            options: []
        },
    });

    const handleClick = () => {
        let redirect = "";

        if(shortcutData.redirect?.length === 1) redirect = shortcutData.redirect[0].value
        else if(shortcutData.redirect?.length === 2) redirect = `${shortcutData.redirect[0].value}?id=${shortcutData.redirect[1].value}`
        else if(shortcutData.redirect?.length === 3) redirect = `${shortcutData.redirect[0].value}?id=${shortcutData.redirect[1].value}&tab=${shortcutData.redirect[2].value}`

        router.push(`/${redirect}`);
    };

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

    useEffect(() => {
        setIsEditing(editable ?? false);
    }, [editable]);

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
                        <Dropdown
                            value={shortcutData?.redirect[0]?.title}
                            options={Object.keys(shortcutOptions)}
                            onChange={(value) => {
                                const selectedOption = shortcutOptions[value];

                                setShortcutData({
                                    ...shortcutData,
                                    redirect: [{
                                        title: selectedOption.initialValue.title,
                                        value: selectedOption.initialValue.value
                                    }]
                                });
                            }}
                        />

                        {
                            shortcutOptions[shortcutData?.redirect[0]?.title]?.options?.map((option, index) => {
                                return (
                                    <div key={index}>
                                        <Dropdown
                                            value={shortcutData?.redirect[index + 1]?.title}
                                            options={option.map((item: { title: string; value: string }) => item.title)}
                                            onChange={(value: string) => {
                                                const selectedOption = option.find((item: { title: string; value: string }) => item.title === value);
                                                if (selectedOption) {
                                                    const newRedirect = [...shortcutData.redirect];
                                                    newRedirect[index + 1] = { title: selectedOption.title, value: selectedOption.value };
                                                    setShortcutData({ ...shortcutData, redirect: newRedirect });
                                                }
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
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
                <p
                    className={styles.title}
                    onClick={handleClick}
                >
                    {shortcutData?.title}
                </p>
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