import { useState } from 'react';
import styles from "./YearSelector.module.css";

// COMPONENTS
import Icon from "@/components/Icon/Icon";

// TYPES
import { YearSelectorProps } from "./YearSelector.interface";

export default function YearSelector({ onYearChange, className }: YearSelectorProps) {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value);
        setSelectedYear(year);
        onYearChange(year);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.selectWrapper}>
                <Icon
                    name="calendar"
                    size={18}
                    color="var(--blue)"
                />

                <span className={styles.yearText}>{selectedYear}</span>  {/* Texto del año */}
                
                <Icon 
                    name="arrowDown"
                    size={18}
                    color="var(--black)"
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