import styles from './proyectos.module.css'
import { useRouter } from 'next/navigation';

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import Searchbar from '@/components/searchbar/Searchbar';
import ProjectCard from '@/components/projectCard/ProjectCard';

export default function Proyectos() {
    const router = useRouter();

    const handleProjectClick = (projectId: number) => {
        router.push(`/proyectos?id=${projectId}&tab=informacion`);
    }

    return (
        <div className="pageContainer">
            <PageTitle
                title="Proyectos"
                icon="rocket"
                subpages={[]}
            />

            <Searchbar/>

            <div className={styles.projectsContainer}>
                <ProjectCard onClick={() => handleProjectClick(1)}/>
                <ProjectCard onClick={() => handleProjectClick(2)}/>
                <ProjectCard onClick={() => handleProjectClick(3)}/>
                <ProjectCard onClick={() => handleProjectClick(4)}/>
            </div>
        </div>
    )
}
