"use client";

import { useState } from 'react';
import styles from './MyProfile.module.css';
import PageIndicator from '../../components/PageIndicator/PageIndicator';

export default function MyProfile() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Settings' | 'Security'>('Overview');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={styles.pageContainer}>
    <div style={{ marginLeft: '20px' }}>
        <PageIndicator
            icon="user"
            title="Profile"
            subpages={subpages}
            onPageChange={setSubpages}
        />
        </div>

      <div className={styles.container}>
        {/* Header de usuario */}
        <div className={styles.userHeader}>
        <img
          src="/images/profile.jpg"
          alt="Foto de perfil"
          className={styles.avatar}
        />
          <div className={styles.userInfo}>
            <h2>John Smith</h2>
            <p>john.smith@company.com</p>
            <div className={styles.tags}>
              <span>Sales Department</span>
              <span>Manager</span>
            </div>
            <small>Last Login: 2/24/2024, 09:15 AM</small>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['Overview', 'Settings', 'Security'].map((tab) => (
            <span
              key={tab}
              className={activeTab === tab ? styles.activeTab : ''}
              onClick={() => setActiveTab(tab as 'Overview' | 'Settings' | 'Security')}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Overview Section */}
        {activeTab === 'Overview' && (
          <>
            <div className={styles.metrics}>
              <div className={styles.card}>
                <p>Calls (7 Days)</p>
                <h3>156</h3>
                <small>⬈ 8% increase</small>
              </div>
              <div className={styles.card}>
                <p>Avg Sentiment</p>
                <h3>8.9</h3>
                <small>⬈ 2.1% increase</small>
              </div>
              <div className={styles.card}>
                <p>Total Duration</p>
                <h3>42:15</h3>
                <small>⬊ -3% decrease</small>
              </div>
            </div>

            <div className={styles.activity}>
              <h4>Recent Activity</h4>
              <ul>
                <li>
                  <strong>Call</strong>
                  <p>Client Meeting - Project Review</p>
                  <span>45 min • 2h ago</span>
                </li>
                <li>
                  <strong>Training</strong>
                  <p>Sales Techniques Workshop</p>
                  <span>2h • 1d ago</span>
                </li>
                <li>
                  <strong>Call</strong>
                  <p>Team Sync</p>
                  <span>30 min • 2d ago</span>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Settings Section */}
        {activeTab === 'Settings' && (
          <div className={styles.settings}>
            <h4>Essential Settings</h4>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div>
                <strong>Notifications</strong>
                <span>Receive important updates</span>
              </div>
              <div
                className={`${styles.toggle} ${notifications ? styles.active : ''}`}
                onClick={() => setNotifications(!notifications)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div>
                <strong>Dark Mode</strong>
                <span>Use dark theme</span>
              </div>
              <div
                className={`${styles.toggle} ${darkMode ? styles.active : ''}`}
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        )}

        {/* Security Section */}
        {activeTab === 'Security' && (
            <div className={styles.settings}>
                <h4>Security Settings</h4>

                <div className={styles.inputGroup}>
                <label htmlFor="currentPass">Current Password</label>
                <input
                    type="password"
                    id="currentPass"
                    placeholder="Enter current password"
                />
                </div>

                <div className={styles.inputGroup}>
                <label htmlFor="newPass">New Password</label>
                <input
                    type="password"
                    id="newPass"
                    placeholder="Enter new password"
                />
                </div>

                <div className={styles.inputGroup}>
                <label htmlFor="confirmPass">Confirm New Password</label>
                <input
                    type="password"
                    id="confirmPass"
                    placeholder="Confirm new password"
                />
                </div>

                <div className={styles.toggleGroup}>
                <div>
                    <strong>Two-Factor Authentication</strong>
                    <span>Enable two-factor authentication</span>
                </div>
                <div className={styles.toggle} />
                </div>
            </div>
            )}
      </div>
    </div>
  );
}