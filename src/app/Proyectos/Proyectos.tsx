// Archivo Proyectos.tsx

import { useState } from 'react';
import styles from './Proyectos.module.css';

// COMPONENTS
import PageIndicator from '@/components/PageIndicator/PageIndicator';
import Button from '@/components/Button/Button';
import YearSelector from '@/components/YearSelector/YearSelector';
import GaleriaDeProyectos from './GaleriaDeProyectos/GaleriaDeProyectos';
import ReporteGeneral from './ReporteGeneral/ReporteGeneral';
import ReporteDeLlamadas from './ReporteDeLlamadas/ReporteDeLlamadas';

// TYPES
import { Project } from './GaleriaDeProyectos/galeriaDeProyectos.interface';

export default function Proyectos() {
    const [project, setProject] = useState<Project | undefined>();
    const [subpages, setSubpages] = useState<string[]>([]);
    const [currentTab, setCurrentTab] = useState<"Reporte General" | "Reporte de Llamadas">("Reporte General");
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    const handleProjectSelection = (project: Project) => {
        setProject(project);
        setSubpages([project.name]);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.projectsPageIndicator}>
                <PageIndicator
                    icon="rocket"
                    title="Proyectos"
                    subpages={subpages}
                    onPageChange={setSubpages}
                />

                {subpages.length === 0 && (
                    <YearSelector
                        onYearChange={setSelectedYear}
                        className={styles.yearSelector}
                    />
                )}
            </div>

            {subpages.length === 0 ? (
                <GaleriaDeProyectos onSelectProject={handleProjectSelection} />
            ) : (
                <div className={styles.contentContainer}>
                    <div className={styles.tabsContainer}>
                        <Button
                            text="Reporte General"
                            onClick={() => setCurrentTab("Reporte General")}
                            disabled={currentTab !== "Reporte General"}
                            className={styles.tabButton}
                            size='large'
                        />
                        <Button
                            text="Reporte de Llamadas"
                            onClick={() => setCurrentTab("Reporte de Llamadas")}
                            disabled={currentTab !== "Reporte de Llamadas"}
                            size='large'
                        />
                    </div>

                    {currentTab === "Reporte General" ? (
                        <ReporteGeneral project={project || { name: "", id: "" } as Project} />
                    ) : (
                        <ReporteDeLlamadas project={project || { name: "", id: "" } as Project} />
                    )}
                </div>
            )}
        </div>
    );
}