"use client"
import styles from "./Sidebar.module.css";
import Image from "next/image";

// COMPONENTS
import SidebarItem from "./SidebarItem/SidebarItem";

// TYPES
import { SidebarItemType, SidebarProps } from "./Sidebar.interface";

export default function Sidebar ({ activeTab, onTabChange }: SidebarProps) {
  const SidebarItems: SidebarItemType[] = [
    { icon: "rocket", page: "Proyectos", text: "Proyectos" },
    { icon: "phone", page: "Llamadas", text: "Llamadas" },
    { icon: "people", page: "Personas", text: "Personas" },
    { icon: "question", page: "Tutoriales", text: "Tutoriales" },
    { icon: "user", page: "MyProfile", text: "Mi Perfil" },
    { icon: "admin", page: "Admin", text: "Admin" },
  ];

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
        SidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            active={activeTab === item.page}
            onClick={() => onTabChange(item.page)}
          />
        ))
      }
    </div>
  );
};
