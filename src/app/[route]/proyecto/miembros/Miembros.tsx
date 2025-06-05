"use client"

import { useState, useEffect } from "react"
import styles from "./miembros.module.css"
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator"

// UTILS
import { translateRole } from "@/utils/roleUtils"

interface ProjectUser {
  userID: number
  name: string
  email: string
  projectRole: string
  role: string
}

interface MiembrosProps {
  id: number
}

export default function Miembros({ id }: MiembrosProps) {
  const [users, setUsers] = useState<ProjectUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjectUsers()
  }, [id])

  const fetchProjectUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://relations-data-api.vercel.app/project/projects/${id}/users`)
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching project users:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ActivityIndicator size={32} color="var(--accent)" />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Miembros del Proyecto</h2>
        <span className={styles.count}>{users.length} miembros</span>
      </div>

      <div className={styles.membersGrid}>
        {users.map((user) => (
          <div key={user.userID} className={styles.memberCard}>
            <div className={styles.memberInfo}>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{user.name}</h3>
                <div className={styles.meta}>
                  <span className={styles.email}>{user.email}</span>
                </div>
              </div>
            </div>
            <div className={styles.roles}>
              <span className={styles.projectRole}>{translateRole(user.projectRole)}</span>
              <span className={styles.systemRole}>{translateRole(user.role)}</span>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No hay miembros asignados a este proyecto</p>
        </div>
      )}
    </div>
  )
} 