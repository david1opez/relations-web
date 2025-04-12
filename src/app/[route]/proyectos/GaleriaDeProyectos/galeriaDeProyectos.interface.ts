export type Project = {
    name: string;
};

export type GaleriaDeProyectosProps = {
    onSelectProject: (project: Project) => void;
};