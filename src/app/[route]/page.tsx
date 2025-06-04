"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

// COMPONENTS
import Sidebar from '@/components/sidebar/Sidebar';

// UTILS
import { checkUserLoggedIn } from '@/utils/auth';
import { removeUserFromLocalStorage, setUserInLocalStorage } from '@/utils/users';

// TYPES
import { UserProfile } from '@/types/userTypes';

// PAGES
import Inicio from './inicio/Inicio';
import Proyectos from './proyectos/Proyectos';
import Proyecto from "./proyecto/Proyecto";
import PerfilPage from "./perfil/page";
import Llamadas from "./llamadas/Llamadas";
import Personas from "./personas/Personas";
import Admin from "./admin/Admin";
import Clientes from "./clientes/Clientes";

const Pages = [
    // COMMON
    { icon: "house", name: "Inicio" },
    { icon: "phone", name: "Llamadas"},
    // COLABORATOR
    { icon: "rocket", name: "Proyectos" },
    // ADMIN
    { icon: "activity", name: "Admin" },
    { icon: "users", name: "Personas" },
    { icon: "star", name: "Clientes" }
];

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [user, setUser] = useState<UserProfile|null>(null);
    const [activePage, setActivePage] = useState<string>('inicio');
    const [id, setId] = useState<number | null>(null);

    const handleLogOut = () => {
        removeUserFromLocalStorage();
        router.push('/');
    }

    useEffect(() => {
        checkUserLoggedIn()
        .then((result) => {
            if (typeof result === 'string') {
                router.push(result);
            } else {
                setUserInLocalStorage(JSON.stringify(result));
                setUser(result);
            }
        })
        .catch((error) => {
            router.push(`/login`)
        });
    }, []);

    useEffect(() => {
      const param = searchParams.get("id");
      setId(param ? parseInt(param, 10) : null);
    }, [searchParams]);

    if(user) return (
        <div className={styles.container}>
            <div className={styles.sidebarSection}>
                <Sidebar
                    user={user}
                    pages={user && user.role === 'admin' ? Pages : user.role === 'colaborador' ? Pages.slice(0, 3) : Pages.slice(0, 2)}
                    activePage={activePage}
                    onPageChange={(page) => setActivePage(page)}
                    onLogOut={() => handleLogOut()}
                />
            </div>

            <div className={styles.contentColumn}>
                {activePage.toLowerCase() === "inicio" && <Inicio/>}
                {activePage.toLowerCase() === "proyectos" && !id && <Proyectos />}
                {activePage.toLowerCase() === "proyectos" && id && <Proyecto id={id} />}
                {activePage.toLowerCase() === "llamadas" && <Llamadas />}
                {activePage.toLowerCase() === "perfil" && <PerfilPage />}
                {activePage.toLowerCase() === "personas" && <Personas />}
                {activePage.toLowerCase() === "clientes" && <Clientes />}
                {activePage.toLowerCase() === "admin" && <Admin />}
            </div>
        </div>
    );
}
