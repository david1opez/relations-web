import styles from "./page.module.css";

// COMPONENTS
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Sidebar/>
      <div className={styles.contentContainer}></div>
    </div>
  );
}
