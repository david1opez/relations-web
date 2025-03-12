// Archivo YearSelector.tsx

import React, { useState } from 'react';
import styles from "./YearSelector.module.css";  // Estilos
import { YearSelectorProps } from "./YearSelector.interface"; // Props del componente

// ICONO
import Icon from "@/components/Icon/Icon"; // Importación del nuevo Icono

export default function YearSelector({ onYearChange }: YearSelectorProps) {
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        setSelectedYear(year);
        onYearChange(year); // Envía el año seleccionado al componente padre
    };

    return (
        <div className={styles.container}>
            <div className={styles.selectWrapper}>
                <Icon
                    name="calendar" // Icono de calendario
                    size={{ width: 20, height: 20 }}  // Tamaño más grande
                    color="#6CCDEA"
                />
                <span className={styles.yearText}>{selectedYear}</span>  {/* Texto del año */}
                <Icon 
                    name="arrowDown"  // Flecha para indicar que es desplegable
                    size={{ width: 14, height: 14 }}
                    color="#6CCDEA"
                    className={styles.arrowIcon}
                />
                <select
                    id="yearSelector"
                    className={styles.select}
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {Array.from({ length: 5 }, (_, index) => {
                        const year = (new Date().getFullYear() - index).toString();
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}