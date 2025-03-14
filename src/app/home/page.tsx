"use client"
import { useState, createElement } from "react";
import styles from "./page.module.css";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import * as Pages from "../Pages";

type PageKeys = keyof typeof Pages;

export default function Home() {
  const [activeTab, setActiveTab] = useState<PageKeys>("Proyectos");

  return (
    <div className={styles.mainContainer}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {
        createElement(Pages[activeTab] || (() => null))
      }
    </div>
  );
}
