"use client"
import styles from './optionsMenu.module.css';
import { useState, useRef } from 'react';

// COMPONENTS
import Icon from '../icon/Icon';

// TYPES
import { OptionsMenuProps } from '@/types/OptionsMenuTypes';

export default function OptionsMenu({ options, onSelect }: OptionsMenuProps) {
    const [showOptions, setShowOptions] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowOptions(false);
        }, 150);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.optionsMenuContainer}
        >
            <Icon
                name='three-dots'
                size={20}
                color='var(--light-gray)'
                className={styles.threeDotsIcon}
            />

            {
                showOptions && (
                    <div className={styles.optionsContainer}>
                        {
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className={styles.option}
                                    onClick={() => {
                                        onSelect(option.name);
                                        setShowOptions(false);
                                    }}
                                >
                                    <Icon
                                        name={option.icon}
                                        size={13}
                                        color='var(--light-gray)'
                                        className={styles.optionIcon}
                                    />
                                    <span className={styles.optionText}>{option.name}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};
