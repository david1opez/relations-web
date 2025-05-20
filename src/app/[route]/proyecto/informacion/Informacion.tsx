import styles from "./informacion.module.css"

// TYPES
type Project = {
  projectID: number
  name: string
  description: string | null
  startDate: number | null
  endDate: number | null
  status?: "active" | "completed" | "pending"
  members?: number
  client?: string
}

// Replace the component to use static data instead of relying on project data
export default function Informacion({ id, project }: { id: number; project: Project }) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}>Descripción del cliente</h3>
        <p className={styles.cardContent}>
          Sunlight Logistics es una empresa líder en soluciones logísticas que busca mejorar su presencia digital y
          optimizar sus procesos de venta en línea.
        </p>
      </div>

      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}>Descripción de la problemática</h3>
        <p className={styles.cardContent}>
          Desarrollo de una plataforma de comercio electrónico con integración de pagos y gestión de inventario. El
          cliente necesita una solución completa que permita a sus usuarios realizar compras en línea de manera segura y
          eficiente.
        </p>
      </div>

      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}>Requerimientos funcionales</h3>
        <p className={styles.cardContent}>
          • Desarrollo de una plataforma de comercio electrónico
          <br />• Integración de pasarela de pagos
          <br />• Sistema de gestión de inventario
          <br />• Panel de administración para productos
          <br />• Gestión de usuarios y permisos
          <br />• Historial de pedidos y seguimiento
        </p>
      </div>

      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}>Requerimientos no funcionales</h3>
        <p className={styles.cardContent}>
          • Tiempo de respuesta menor a 2 segundos
          <br />• Disponibilidad 24/7 con uptime de 99.9%
          <br />• Interfaz responsiva para dispositivos móviles y escritorio
          <br />• Seguridad en transacciones y datos personales
          <br />• Escalabilidad para soportar hasta 10,000 usuarios concurrentes
          <br />• Cumplimiento con estándares de accesibilidad WCAG 2.1
        </p>
      </div>
    </div>
  )
}
