import styles from "./informacion.module.css"
import { FaUserTie, FaExclamationTriangle, FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";

// TYPES
type Project = {
  projectID: number
  name: string
  description: string | null
  problemDescription:  string | null
  reqFuncionales:  string | null
  reqNoFuncionales:  string | null
  startDate: number | null
  endDate: number | null
  status?: "active" | "completed" | "pending"
  members?: number
  clientEmail?: string
  client?: string
  clientDescription?: string
}



// Replace the component to use static data instead of relying on project data
export default function Informacion({ id, project }: { id: number; project: Project }) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer} style={{'--accent': '#6CCDEA'}}>
        <div className={styles.iconCircle}><FaUserTie /></div>
        <div>
          <h3 className={styles.cardTitle}>Descripción del cliente</h3>
          <p className={styles.cardContent}>{project.clientDescription}</p>
        </div>
      </div>
      <div className={styles.cardContainer} style={{'--accent': '#F7B731'}}>
        <div className={styles.iconCircle}><FaExclamationTriangle /></div>
        <div>
          <h3 className={styles.cardTitle}>Descripción de la problemática</h3>
          <p className={styles.cardContent}>{project.problemDescription}</p>
        </div>
      </div>
      <div className={styles.cardContainer} style={{'--accent': '#26de81'}}>
        <div className={styles.iconCircle}><FaCheckCircle /></div>
        <div>
          <h3 className={styles.cardTitle}>Requerimientos funcionales</h3>
          <p className={styles.cardContent}>{project.reqFuncionales}</p>
        </div>
      </div>
      <div className={styles.cardContainer} style={{'--accent': '#eb3b5a'}}>
        <div className={styles.iconCircle}><FaRegTimesCircle /></div>
        <div>
          <h3 className={styles.cardTitle}>Requerimientos no funcionales</h3>
          <p className={styles.cardContent}>{project.reqNoFuncionales}</p>
        </div>
      </div>
    </div>
  )
}
