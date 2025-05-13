"use client";
import { useState } from 'react';
import styles from './iconSelector.module.css';
import Icons from '@/components/icon/icons.json';

// COMPONENTS
import Icon from '@/components/icon/Icon';

// TYPES
import { IconSelectorProps } from '@/types/IconSelectorTypes';
import { IconName } from '@/types/IconTypes';

export default function IconSelector({label, value, onChange}: IconSelectorProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconName>(value);

    const IconOptions = Object.entries(Icons).map(
        ([name, icon]) => ({ name: name as IconName, ...icon })
    );
    
    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>

            <div className={styles.selectedIconContainer}>
                <Icon
                    name={selectedIcon}
                    size={22}
                    color='var(--light-gray)'
                    onClick={() => setShowOptions(!showOptions)}
                />
            </div>

            {
                showOptions && (
                    <div className={styles.optionsContainer}>
                        {
                            IconOptions.map((icon, index) => (
                                <Icon
                                    key={index}
                                    name={icon.name}
                                    size={20}
                                    color={selectedIcon == icon.name ? 'var(--accent)' : 'var(--light-gray)'}
                                    onClick={() => {
                                        setSelectedIcon(icon.name);
                                        onChange(icon.name);
                                        setShowOptions(false);
                                    }}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};
