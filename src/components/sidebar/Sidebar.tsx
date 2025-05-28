"use client"
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"
import Image from "next/image";

// COMPONENTS
import SidebarItem from "./sidebarPage/SidebarPage";
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";
import OptionsMenu from "@/components/optionsMenu/OptionsMenu";

// UTILS
import { GetUser } from "@/utils/GetUser";

// TYPES
import UserType from "@/types/UserTypes";
import { SidebarProps, SidebarItemType } from "@/types/SidebarTypes";

export default function Sidebar ({ onPageChange }:  SidebarProps) {
  const router = useRouter();
  const { route }: { route: string } = useParams();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType|null>(null);

  const [activePage, setActivePage] = useState<string>(route);
  const [pages, setPages] = useState<SidebarItemType[]>([
    { icon: "house", name: "Inicio" },
    { icon: "rocket", name: "Proyectos" },
    { icon: "phone", name: "Llamadas"},
    { icon: "activity", name: "Admin" },
  ]);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.history.pushState({}, "", page.toLowerCase());
    window.dispatchEvent(new Event("popstate"));

    onPageChange(page);
  }

  const handlePagesToShow = () => {
    if (user) {
      const { role } = user;

      if (role === "admin") {
        setPages([
          ...pages,
          { icon: "users", name: "Personas" },
          { icon: "star", name: "Clientes" }
        ]);
      }
    }
  }

  const handleUserLoad = async () => {
    await GetUser()
    .then(userData => {
        setUser(userData);

        if(!userData) {
            router.push("/?login=true");
            return;
        }
    })
    .catch(() => {
        router.push("/login?login=true");
        return;
    })
    .finally(() => setLoading(false))
  }

  const handleLogOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    if (route) {
      setActivePage(route);
      onPageChange(activePage);
    };
  }, [route]);

  useEffect(() => {    
    if(!user) handleUserLoad()
    else handlePagesToShow();
  }, [user]);

  if(!user) return null;

  return (
    <div className={styles.container}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className={styles.logo}
      />

      <div className={`${styles.userContainer} ${activePage.toLowerCase() === 'perfil' ? styles.active : ''}`}>
        {
            loading ? (
                <ActivityIndicator/>
            ) : (
                <div 
                    className={styles.profilePictureContainer}
                    onClick={() => handlePageChange("Perfil")}
                    style={{ cursor: 'pointer' }}
                >
                    {
                        user?.profilePicture ? (
                            <Image
                                src={user?.profilePicture}
                                alt="Profile Picture"
                                width={50}
                                height={50}
                                className={styles.profilePicture}
                            />
                        ) : (
                            <div className={styles.profilePicture}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                </div>
            )
        }

        {
            !loading && (
                <div 
                    onClick={() => handlePageChange("Perfil")}
                    style={{ cursor: 'pointer' }}
                >
                    <p className={styles.userName}>{user?.name || "Random Employee"}</p>
                    <p className={styles.userRole}>{user?.role || "Random Role"}</p>
                </div>
            )
        }

        {
            !loading && (
                <OptionsMenu
                    options={[{icon: 'exit', name: 'Cerrar Sesión'}]}
                    onSelect={() => handleLogOut()}
                />
            )
        }
      </div>

      <div className={styles.pagesContainer}>
        {
            pages.map((page, index) => (
            <SidebarItem
                key={index}
                icon={page.icon}
                pageName={page.name}
                active={activePage.toLowerCase() === page.name.toLowerCase()}
                onClick={() => handlePageChange(page.name)}
            />
            ))
        }
      </div>
    </div>
  );
};
