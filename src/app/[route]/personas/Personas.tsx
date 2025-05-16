/*
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
    */


import { useState, useEffect } from "react"
import styles from "./personas.module.css"

// Components
import PageTitle from "@/components/pageTitle/PageTitle"
import Searchbar from "@/components/searchbar/Searchbar"
import PersonItem from "@/components/personItem/PersonItem"
import Dialog from "@/components/dialog/Dialog"

// Types
import type { User, UserFormData } from "@/types/UserManagementTypes"

// Utils
import { getUsers, createUser } from "@/utils/UserManagement"
import { GetUser } from "@/utils/GetUser"

export default function Personas() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Form state for adding a new user
  const [newUserData, setNewUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "colaborator",
    departmentID: undefined,
  })

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        // Check if current user is admin
        const currentUser = await GetUser()
        console.log("Current user:", currentUser)

        if (currentUser?.role === "admin") {
          setIsAdmin(true)
          await loadUsers()
        } else {
          console.log("User is not admin:", currentUser?.role)
        }
      } catch (error) {
        console.error("Error checking user permissions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAndLoadData()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      console.log("Loading users...")
      const data = await getUsers()
      console.log("Users loaded:", data)
      setUsers(data || [])
      setFilteredUsers(data || [])
    } catch (error) {
      console.error("Error in loadUsers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          (user.department && user.department.name.toLowerCase().includes(value.toLowerCase())),
      )
      setFilteredUsers(filtered)
    }
  }

  const handleAddUser = async () => {
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
      // Show validation error
      return
    }

    setIsLoading(true)
    const createdUser = await createUser(newUserData)

    if (createdUser) {
      setUsers((prev) => [...prev, createdUser])
      setFilteredUsers((prev) => [...prev, createdUser])

      // Reset form
      setNewUserData({
        name: "",
        email: "",
        password: "",
        role: "colaborator",
        departmentID: undefined,
      })

      setIsAddDialogOpen(false)
    }

    setIsLoading(false)
  }

  const handleDeleteUser = (userId: number) => {
    // Cambiado de string a number
    setUsers((prev) => prev.filter((user) => user.userID !== userId)) // Cambiado de user.id a user.userID
    setFilteredUsers((prev) => prev.filter((user) => user.userID !== userId)) // Cambiado de user.id a user.userID
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    // Cambiado de string a number
    setUsers((prev) => prev.map((user) => (user.userID === userId ? { ...user, role: newRole as User["role"] } : user)))

    setFilteredUsers((prev) =>
      prev.map((user) => (user.userID === userId ? { ...user, role: newRole as User["role"] } : user)),
    )
  }

  if (isLoading) {
    return (
      <div className="pageContainer">
        <PageTitle title="Personas" icon="users" subpages={[]} />
        <div className={styles.loadingContainer}>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="pageContainer">
        <PageTitle title="Personas" icon="users" subpages={[]} />
        <div className={styles.unauthorizedContainer}>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pageContainer">
      <PageTitle title="Personas" icon="users" subpages={[]} />

      <div className={styles.headerContainer}>
        <Searchbar value={searchTerm} onChange={handleSearch} />
        <button className={styles.addButton} onClick={() => setIsAddDialogOpen(true)}>
          Agregar persona
        </button>
      </div>

      <div className={styles.scrollContainer}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <PersonItem
              key={user.userID} // Cambiado de user.id a user.userID
              user={user}
              onDelete={handleDeleteUser}
              onRoleChange={handleRoleChange}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            {searchTerm ? (
              <div className={styles.emptyState}>No se encontraron usuarios que coincidan con: {searchTerm}</div>
            ) : (
              <div className={styles.emptyState}>No hay usuarios registrados. Agrega uno nuevo.</div>
            )}
          </div>
        )}
      </div>

      {/* Add User Dialog, message is using JSX, its supposed to not change something important*/}
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onConfirm={handleAddUser}
        title="Agregar nuevo usuario"
        message={
          <div className={styles.addUserForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre:</label>
              <input
                id="name"
                type="text"
                value={newUserData.name}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Correo:</label>
              <input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Contraseña"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Rol:</label>
              <select
                id="role"
                value={newUserData.role}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, role: e.target.value as User["role"] }))}
              >
                <option value="colaborator">Colaborador</option>
                <option value="support">Soporte</option>
                <option value="teamLead">Líder de Equipo</option>
                <option value="projectLead">Líder de Proyecto</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="departmentID">Departamento ID:</label>
              <input
                id="departmentID"
                type="number"
                value={newUserData.departmentID || ""}
                onChange={(e) =>
                  setNewUserData((prev) => ({
                    ...prev,
                    departmentID: e.target.value ? Number.parseInt(e.target.value) : undefined,
                  }))
                }
                placeholder="ID del departamento (opcional)"
              />
            </div>
          </div>
        }
      />
    </div>
  )
}
