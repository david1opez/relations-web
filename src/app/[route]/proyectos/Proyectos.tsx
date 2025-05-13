import styles from './proyectos.module.css'
import { useRouter } from 'next/navigation';

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import Searchbar from '@/components/searchbar/Searchbar';
import ProjectCard from '@/components/projectCard/ProjectCard';

export default function Proyectos() {
    const router = useRouter();

    const handleProjectClick = (projectId: string) => {
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
                <ProjectCard onClick={() => handleProjectClick('randomId1')}/>
                <ProjectCard onClick={() => handleProjectClick('randomId2')}/>
                <ProjectCard onClick={() => handleProjectClick('randomId3')}/>
                <ProjectCard onClick={() => handleProjectClick('randomId4')}/>
            </div>
        </div>
    )
}
