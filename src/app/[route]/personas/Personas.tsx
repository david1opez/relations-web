import { useState, useEffect } from "react";
import styles from "./personas.module.css";

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import Searchbar from "@/components/searchbar/Searchbar";
import PersonItem from "@/components/personItem/PersonItem";

export default function Personas() {
    return (
        <div className="pageContainer">
            <PageTitle
                title="Personas"
                icon="users"
                subpages={[]}
            />

            <div className={styles.headerContainer}>
                <Searchbar/>
                <button className={styles.addButton}>Agregar personas</button>
            </div>

            <div className={styles.scrollContainer}>
                <PersonItem/>
                <PersonItem/>
            </div>
        </div>
    )
}