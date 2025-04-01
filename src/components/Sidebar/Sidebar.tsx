"use client"
import styles from "./Sidebar.module.css";
import Image from "next/image";

// COMPONENTS
import SidebarItem from "./SidebarItem/SidebarItem";

// TYPES
import { SidebarItemType, SidebarProps } from "./Sidebar.interface";

export default function Sidebar ({ activeTab, onTabChange }: SidebarProps) {
  const SidebarItems: SidebarItemType[] = [
    { icon: "rocket", text: "Proyectos" },
    { icon: "phone", text: "Llamadas" },
    { icon: "grid", text: "Dashboard" },
    { icon: "people", text: "Personas" },
    { icon: "question", text: "Tutoriales" },
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
            active={activeTab === item.text}
            onClick={() => onTabChange(item.text)}
          />
        ))
      }
    </div>
  );
};
