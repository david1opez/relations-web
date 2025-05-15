"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

// COMPONENTES
import Sidebar from "@/components/sidebar/Sidebar";

// PÁGINAS
import Inicio from "./inicio/Inicio";
import Proyectos from "./proyectos/Proyectos";
import Proyecto from "./proyecto/Proyecto";
import PerfilPage from "./perfil/page";
import Llamadas from "./llamadas/Llamadas";
import Personas from "./personas/Personas";

export default function RoutePage() {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<string>("");  
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const param = searchParams.get("id");
    setId(param ?? "");
  }, [searchParams]);

  return (
    <div className={styles.container}>
      {/* 1. Columna fija: sólo sidebar */}
      <div className={styles.sidebarColumn}>
        <Sidebar onPageChange={setActivePage} />
      </div>

      {/* 2. Columna scrollable: contenido de cada página */}
      <div className={styles.contentColumn}>
        {activePage.toLowerCase() === "inicio" && <Inicio />}
        {activePage.toLowerCase() === "proyectos" && !id && <Proyectos />}
        {activePage.toLowerCase() === "proyectos" && id && <Proyecto id={id} />}
        {activePage.toLowerCase() === "perfil" && <PerfilPage />}
        {activePage.toLowerCase() === "llamadas" && <Llamadas />} {/* ⬅️ Agregado aquí */}
      </div>
            {activePage?.toLowerCase() === "personas" && <Personas/>}
    </div>
  );
}