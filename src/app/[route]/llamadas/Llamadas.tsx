import { useState, useEffect } from "react";
import styles from "./llamadas.module.css";

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import Icon from "@/components/icon/Icon";
import Searchbar from "@/components/searchbar/Searchbar";

// UTILS
import { GetUser } from "@/utils/GetUser";

// TYPES
import UserType from "@/types/UserTypes";

export default function Llamadas() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        GetUser()
        .then(setUser)
        .catch((e) => {
            alert(e)
            window.location.href = "/?login=true";
        });
    }, []);

    return (
        <div className="pageContainer">
            <PageTitle
                title="Inicio"
                icon="house"
                subpages={[]}
            />

            <div className={styles.calls}>
                <div className={styles.headerContainer}>
                    <Icon
                        name="activity"
                        size={20}
                        color="var(--accent)"
                    />
                    <h2 className={styles.title}>Tus llamadas</h2>
                </div>
                <Searchbar/>
            </div>
            <div className={styles.procesedCalls}>
                <div className={styles.headerContainer}>
                    <Icon
                        name="activity"
                        size={20}
                        color="var(--accent)"
                    />
                    <h2 className={styles.title}>
                        {user?.role === 'support' ? 'Llamadas analizadas' : 'Llamadas asignadas a proyectos'}
                    </h2>
                </div>
                <Searchbar/>
            </div>
        </div>
    )
}