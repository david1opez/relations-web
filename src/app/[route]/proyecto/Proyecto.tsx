import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './proyecto.module.css';

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import MetadataItem from '@/components/metadataItem/MetadataItem';
import Informacion from './informacion/Informacion';
import Llamadas from './llamadas/Llamadas';
import Recursos from './recursos/Recursos';
import Equipos from './equipos/Equipos'; // <<--- Nuevo componente que necesitas crear

const Tabs: ('informacion'|'llamadas'|'recursos'|'equipos')[] = [
    "informacion",
    "equipos",
    "llamadas",
    "recursos"
     // <<--- Lo agregamos aquí
];

export default function Proyecto({ id }: { id: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<'informacion'|'llamadas'|'recursos'|'equipos'>("informacion");
    
    useEffect(() => {
        const tab = searchParams.get("tab") as 'informacion'|'llamadas'|'recursos'|'equipos'|null;
        if (tab) setActiveTab(tab);
        else setActiveTab("informacion");
    }, [searchParams]);

    return (
        <div className="pageContainer">
            <PageTitle
                title="Proyectos"
                icon="rocket"
                subpages={[id.toString()]}
                onPageChange={() => router.push('/proyectos')}
            />

            <p className={styles.label}>Nombre del proyecto:</p>
            <h1 className={styles.projectTitle}>Plataforma eCommerce móvil</h1>

            <div className={styles.metadataContainer}>
                <MetadataItem
                    icon='user'
                    title="Cliente"
                    value="01/01/2023"
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='users'
                    title="Miembros"
                    value="01/01/2023"
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='calendar'
                    title="Fecha de inicio"
                    value="01/01/2023"
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='clock'
                    title="Fecha de entrega"
                    value="01/01/2023"
                    color='var(--accent)'
                />
            </div>

            <div className={styles.tabsContainer}>
                {
                    Tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {
                                tab === "informacion" ? "Información" :
                                tab === "llamadas" ? "Llamadas" :
                                tab === "recursos" ? "Recursos" :
                                tab === "equipos" ? "Equipos" : ""
                            }
                        </button>
                    ))
                }
            </div>

            {
                activeTab === "informacion" ? (
                    <Informacion id={id}/>
                ) : activeTab === "llamadas" ? (
                    <Llamadas id={id}/>
                ) : activeTab === "recursos" ? (
                    <Recursos id={id}/>
                ) : activeTab === "equipos" ? (
                    <Equipos id={id}/>
                ) : null
            }
        </div>
    )
}