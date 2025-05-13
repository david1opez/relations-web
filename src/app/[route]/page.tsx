"use client"
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

// COMPONENTS
import Sidebar from "@/components/sidebar/Sidebar";

// UTILS
import { GetUser } from "@/utils/GetUser";

// PAGES
import Inicio from "./inicio/Inicio";
import Proyectos from "./proyectos/Proyectos";
import Proyecto from "./proyecto/Proyecto";
import Llamadas from "./llamadas/Llamadas";

// TYPES
import UserType from "@/types/UserTypes";

export default function App() {
    const searchParams = useSearchParams();

    const [activePage, setActivePage] = useState<string>();
    const [id, setId] = useState<string>();
    const [user, setUser] = useState<UserType|null>(null);

    useEffect(() => {
        const id = searchParams.get("id");
        setId(id || "");

        GetUser().then(userData => {
            setUser(userData);
            if(!userData) {
                window.location.href = "/?login=true";
                return;
            }
        })
        .catch((e) => {
            alert(e)
            window.location.href = "/?login=true";
        });
    }, [searchParams]);

    if(!user) return null;

    return (
        <div className={styles.container}>
            <Sidebar onPageChange={setActivePage} />

            {activePage?.toLowerCase() === "inicio" && <Inicio />}
            {activePage?.toLowerCase() === "proyectos" && !id && <Proyectos />}
            {activePage?.toLowerCase() === "proyectos" && id && <Proyecto id={id}/>}
            {activePage?.toLowerCase() === "llamadas" && <Llamadas/>}
        </div>
    );
}