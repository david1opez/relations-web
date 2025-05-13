import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './proyecto.module.css';

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import MetadataItem from '@/components/metadataItem/MetadataItem';
import Informacion from './informacion/Informacion';
import Llamadas from './llamadas/Llamadas';
import Recursos from './recursos/Recursos';

const Tabs: ('informacion'|'llamadas'|'recursos')[] = [
    "informacion",
    "llamadas",
    "recursos"
];

export default function Proyecto({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<'informacion'|'llamadas'|'recursos'>("informacion");
    
    useEffect(() => {
        const tab = searchParams.get("tab") as 'informacion'|'llamadas'|'recursos'|null;
        if (tab) setActiveTab(tab);
        else setActiveTab("informacion");
    }, [searchParams]);

    return (
        <div className="pageContainer">
            <PageTitle
                title="Proyectos"
                icon="rocket"
                subpages={[id]}
                onPageChange={() => router.push('/proyectos')}
            />

            <p className={styles.label}>Nombre del proyecto:</p>
            <h1 className={styles.projectTitle}>Plataforma eCommerce móvil</h1>

            <div className={styles.metadataContainer}>
                <MetadataItem
                    icon='user'
                    title="Cliente"
                    value="Juan Pérez"
                    color='var(--accent)'
                />
                <MetadataItem
                    icon='users'
                    title="Miembros"
                    value="12"
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

            {
                activeTab === "informacion" && (
                    <div>
                        <p className={styles.label}>Descripción del proyecto:</p>
                        <p className={styles.projectDescription}>
                            Sed vel turpis eleifend, fermentum diam vitae, rutrum lorem. Cras eget viverra odio,
                            at condimentum orci. Aliquam erat volutpat. Donec mollis justo sapien, eu tempor 
                            erat dignissim eu. Curabitur lacinia feugiat elit id fringilla. Ut accumsan dui sed
                            dolor consectetur aliquam. Curabitur venenatis odio at nisi venenatis auctor.
                        </p>
                    </div>
                )
            }

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
                                tab === "recursos" ? "Recursos" : ""
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
                ) : null
            }
        </div>
    )
}