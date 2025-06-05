import { useState, useEffect } from "react"
import styles from "./personas.module.css"

// Components
import PageTitle from "@/components/pageTitle/PageTitle"
import Searchbar from "@/components/searchbar/Searchbar"
import PersonItem from "@/components/personItem/PersonItem"
import AddPersonDialog from "@/components/addPersonDialog/AddPersonDialog"
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator"

// Types
import type { User } from "@/types/UserManagementTypes"
import type { Department } from "@/utils/DepartmentManagement"

// Utils
import { getUsers } from "@/utils/UserManagement"
import { GetUser } from "@/utils/GetUser"
import { getDepartments } from "@/utils/DepartmentManagement"

export default function Personas() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        // Check if current user is admin
        const currentUser = await GetUser()
        console.log("Current user:", currentUser)

        if (currentUser?.role === "admin") {
          setIsAdmin(true)
          await Promise.all([loadUsers(), loadDepartments()])
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

  const loadDepartments = async () => {
    try {
      const data = await getDepartments()
      setDepartments(data)
    } catch (error) {
      console.error("Error loading departments:", error)
    }
  }

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

  const handleAddUserSuccess = (newUser: User) => {
    setUsers((prev) => [...prev, newUser])
    setFilteredUsers((prev) => [...prev, newUser])
  }

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.userID !== userId)) 
    setFilteredUsers((prev) => prev.filter((user) => user.userID !== userId)) 
  }

  const handleRoleChange = (userId: number, newRole: string) => {
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
          <ActivityIndicator size={40} color="var(--accent)" />
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
              key={user.userID} 
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

      <AddPersonDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={handleAddUserSuccess}
        departments={departments}
      />
    </div>
  )
}