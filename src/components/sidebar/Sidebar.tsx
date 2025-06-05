"use client";
import { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";

// COMPONENTS
import SidebarPage from "./sidebarPage/SidebarPage";
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";
import OptionsMenu from "@/components/optionsMenu/OptionsMenu";

// TYPES
import SidebarProps from "@/types/components/sidebarTypes";

// UTILS
import { translateRole } from "@/utils/roleUtils";

export default function Sidebar({ user, pages, activePage, onPageChange, onLogOut }: SidebarProps) {
  const { route }: { route: string } = useParams();

  const handlePageChange = (page: string) => {
    if (activePage !== page) {
      onPageChange(page.toLowerCase());
      window.history.pushState({}, "", page.toLowerCase());
      window.dispatchEvent(new Event("popstate"));
    }
  };

  useEffect(() => {
    if (route) {
      const formattedRoute = route.toLowerCase();

      if (activePage.toLowerCase() !== formattedRoute) {
        onPageChange(formattedRoute);
      }
    }
  }, [route]);

  useEffect(() => {
    activePage = activePage.toLowerCase();
  }, [activePage]);

  return (
    <div className={styles.container}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className={styles.logo}
      />

      {
        !user ? (
          <div
            className={`${styles.userContainer} ${activePage === "perfil" ? styles.active : ""}`}
          >
            <ActivityIndicator />
          </div>
        ) : (
          <div
            className={`${styles.userContainer} ${activePage === "perfil" ? styles.active : ""}`}
          >
            <div
              className={styles.profilePictureContainer}
              onClick={() => handlePageChange("perfil")}
              style={{ cursor: "pointer" }}
            >
              {
                user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className={styles.profilePicture}
                  />
                ) : (
                  <div className={styles.profileLetter}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )
              }
            </div>

            <div
              onClick={() => handlePageChange("Perfil")}
              style={{ cursor: "pointer" }}
            >
              <p className={styles.userName}>{user.name || "Sin nombre"}</p>
              <p className={styles.userRole}>{translateRole(user.role)}</p>
            </div>

            <OptionsMenu
              options={[{ icon: "exit", name: "Cerrar Sesión" }]}
              onSelect={(option: string) => {
                if (option === "Cerrar Sesión" && onLogOut) {
                  onLogOut();
                }
              }}
            />
          </div>
        )
      }

      <div className={styles.pagesContainer}>
        {
          pages.map((page, index) => (
            <SidebarPage
              key={index}
              icon={page.icon}
              pageName={page.name}
              active={activePage === page.name.toLowerCase()}
              onClick={() => handlePageChange(page.name)}
            />
          ))
        }
      </div>
    </div>
  );
}
