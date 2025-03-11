import { useState } from 'react';
import styles from './Proyectos.module.css';

// COMPONENTS
import PageIndicator from '@/components/PageIndicator/PageIndicator';
import Button from '@/components/Button/Button';
// import YearSelector from '../../components/YearSelector/YearSelector';
import GaleriaDeProyectos from './GaleriaDeProyectos/GaleriaDeProyectos';
import ReporteGeneral from './ReporteGeneral/ReporteGeneral';
import ReporteDeLlamadas from './ReporteDeLlamadas/ReporteDeLlamadas';

export default function Proyectos() {
    const [subpages, setSubpages] = useState<string[]>(["Dashboard para deliveries"]);
    const [currentTab, setCurrentTab] = useState<"Reporte General" | "Reporte de Llamadas">("Reporte General");

    return (
        <div className={styles.pageContainer}>
            <div className={styles.projectsPageIndicator}>
                <PageIndicator
                    icon="rocket"
                    title="Proyectos"
                    subpages={subpages}
                    onPageChange={setSubpages}
                />

                {/* {
                    subpages.length === 0 && (
                        <YearSelector value={2025} onYearChange={(year) => console.log(year)}/>
                    )
                } */}
            </div>

            {
                subpages.length === 0 ? (
                    <GaleriaDeProyectos/>
                ) : (
                    <div className={styles.contentContainer}>
                        <div className={styles.tabsContainer}>
                            <Button
                                text="Reporte General"
                                onClick={() => setCurrentTab("Reporte General")}
                                disabled={currentTab !== "Reporte General"}
                                className={styles.tabButton}
                            />
                            <Button
                                text="Reporte de Llamadas"
                                onClick={() => setCurrentTab("Reporte de Llamadas")}
                                disabled={currentTab !== "Reporte de Llamadas"}
                            />
                        </div>

                        {
                            currentTab === "Reporte General" ? (
                                <ReporteGeneral/>
                            ) : (
                                <ReporteDeLlamadas/>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}