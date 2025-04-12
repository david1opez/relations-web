import { useState } from 'react';
import styles from './admin.module.css';
import PageTitle from '@/components/pageTitle/PageTitle';

export default function Admin() {
  const [subpages, setSubpages] = useState<string[]>([]);

  return (
    <div className={styles.pageContainer}>
      <PageTitle
        icon="admin"
        title="Administrador"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      {/* User Management Section */}
      <div className={styles.section}>
        <div className={styles.header}>
          <h2>Gestión de Usuarios</h2>
          <div className={styles.searchAdd}>
            <input type="text" placeholder="Buscar usuarios..." />
            <button className={styles.button}>+ Agregar Usuario</button>
          </div>
        </div>

        <div className={styles.filters}>
          <button className={styles.button}>Todos los Roles</button>
          <button className={styles.button}>Todos los Estados</button>
          <button className={styles.button}>Todos los Departamentos</button>
          <button className={styles.button}>Todo el Tiempo</button>
        </div>

        <table className={styles.userTable}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>DEPARTAMENTO</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>ÚLTIMO ACCESO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>John Smith</td>
              <td>john@example.com</td>
              <td>Ventas</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-24 09:30</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Sarah Jones</td>
              <td>sarah@example.com</td>
              <td>Soporte</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-23 14:15</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Mike Wilson</td>
              <td>mike@example.com</td>
              <td>TI</td>
              <td></td>
              <td><span className={styles.suspended}>Suspendido</span></td>
              <td>2024-02-22 11:45</td>
              <td>
                <button className={`${styles.button} ${styles.activate}`}>Activar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Ana Torres</td>
              <td>ana@company.com</td>
              <td>Marketing</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-21 10:05</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Laura Gómez</td>
              <td>laura@company.com</td>
              <td>RRHH</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-20 08:15</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Tomás López</td>
              <td>tomas@company.com</td>
              <td>Operaciones</td>
              <td></td>
              <td><span className={styles.suspended}>Suspendido</span></td>
              <td>2024-02-18 13:22</td>
              <td>
                <button className={`${styles.button} ${styles.activate}`}>Activar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Brenda Ruiz</td>
              <td>brenda@company.com</td>
              <td>Diseño</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-17 09:00</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>David Ortega</td>
              <td>david@company.com</td>
              <td>Legal</td>
              <td></td>
              <td><span className={styles.active}>Activo</span></td>
              <td>2024-02-16 16:40</td>
              <td>
                <button className={`${styles.button} ${styles.secondary}`}>Desactivar</button>
                <button className={`${styles.button} ${styles.danger}`}>Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button className={styles.button}>Anterior</button>
          <button className={`${styles.button} ${styles.currentPage}`}>1</button>
          <button className={styles.button}>2</button>
          <button className={styles.button}>3</button>
          <button className={styles.button}>Siguiente</button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.section}>
        <h3>Actividad Reciente</h3>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>ACCIÓN</th>
              <th>FECHA Y HORA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Inicio de sesión exitoso</td>
              <td>2024-02-24 09:30</td>
            </tr>
            <tr>
              <td>Sarah Jones</td>
              <td>Rol cambiado a Gerente</td>
              <td>2024-02-23 14:15</td>
            </tr>
            <tr>
              <td>Mike Wilson</td>
              <td>Cuenta suspendida</td>
              <td>2024-02-22 11:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}