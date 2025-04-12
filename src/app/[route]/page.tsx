"use client"
import { useState } from "react";
import styles from "./page.module.css";

// COMPONENTS
import Sidebar from "@/components/sidebar/Sidebar";

// PAGES
import Inicio from "./inicio/Inicio";
import Proyectos from "./proyectos/Proyectos";

export default function App() {
    const [activePage, setActivePage] = useState<string>();

    return (
        <div className={styles.container}>
            <Sidebar onPageChange={setActivePage}/>

            {
                activePage?.toLowerCase() === "inicio" && <Inicio/>
            }

            {
                activePage?.toLowerCase() === "proyectos" && <Proyectos/>
            }
        </div>
    )
};