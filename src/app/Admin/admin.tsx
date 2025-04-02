import { useState } from 'react';
import styles from './admin.module.css';
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function Admin() {
  const [subpages, setSubpages] = useState<string[]>([]);

  return (
    <div className={styles.pageContainer}>
      <PageIndicator
        icon="admin"
        title="Admin"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      {/* User Management Section */}
      <div className={styles.section}>
        <div className={styles.header}>
          <h2>User Management</h2>
          <div className={styles.searchAdd}>
            <input type="text" placeholder="Search users..." />
            <button className={styles.button}>+ Add User</button>
          </div>
        </div>

        <div className={styles.filters}>
          <button className={styles.button}>All Roles</button>
          <button className={styles.button}>All Statuses</button>
          <button className={styles.button}>All Departments</button>
          <button className={styles.button}>All Time</button>
        </div>

        <table className={styles.userTable}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>LAST LOGIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
  <tr>
    <td><input type="checkbox" /></td>
    <td>John Smith</td>
    <td>john@example.com</td>
    <td>Sales</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-24 09:30</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Sarah Jones</td>
    <td>sarah@example.com</td>
    <td>Support</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-23 14:15</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Mike Wilson</td>
    <td>mike@example.com</td>
    <td>IT</td>
    <td></td>
    <td><span className={styles.suspended}>Suspended</span></td>
    <td>2024-02-22 11:45</td>
    <td>
      <button className={`${styles.button} ${styles.activate}`}>Activate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Ana Torres</td>
    <td>ana@company.com</td>
    <td>Marketing</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-21 10:05</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Laura Gómez</td>
    <td>laura@company.com</td>
    <td>HR</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-20 08:15</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Tomás López</td>
    <td>tomas@company.com</td>
    <td>Operations</td>
    <td></td>
    <td><span className={styles.suspended}>Suspended</span></td>
    <td>2024-02-18 13:22</td>
    <td>
      <button className={`${styles.button} ${styles.activate}`}>Activate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>Brenda Ruiz</td>
    <td>brenda@company.com</td>
    <td>Design</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-17 09:00</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
  <tr>
    <td><input type="checkbox" /></td>
    <td>David Ortega</td>
    <td>david@company.com</td>
    <td>Legal</td>
    <td></td>
    <td><span className={styles.active}>Active</span></td>
    <td>2024-02-16 16:40</td>
    <td>
      <button className={`${styles.button} ${styles.secondary}`}>Deactivate</button>
      <button className={`${styles.button} ${styles.danger}`}>Delete</button>
    </td>
  </tr>
</tbody>



        </table>

        <div className={styles.pagination}>
          <button className={styles.button}>Previous</button>
          <button className={`${styles.button} ${styles.currentPage}`}>1</button>
          <button className={styles.button}>2</button>
          <button className={styles.button}>3</button>
          <button className={styles.button}>Next</button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.section}>
        <h3>Recent Activity</h3>
        <table className={styles.activityTable}>
          <thead>
            <tr>
              <th>USER</th>
              <th>ACTION</th>
              <th>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Login successful</td>
              <td>2024-02-24 09:30</td>
            </tr>
            <tr>
              <td>Sarah Jones</td>
              <td>Role changed to Manager</td>
              <td>2024-02-23 14:15</td>
            </tr>
            <tr>
              <td>Mike Wilson</td>
              <td>Account suspended</td>
              <td>2024-02-22 11:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}