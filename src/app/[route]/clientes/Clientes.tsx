import { useState, useEffect } from "react"
import styles from "./clientes.module.css"

// Components
import PageTitle from "@/components/pageTitle/PageTitle"
import Searchbar from "@/components/searchbar/Searchbar"
import ClientItem from "@/components/clientItem/ClientItem"
import AddClientDialog from "@/components/addClientDialog/AddClientDialog"

// Types
import type { Client } from "@/types/ClientTypes"

// Utils
import { getClients } from "@/utils/ClientManagement"
import { GetUser } from "@/utils/GetUser"

export default function Clientes() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        // Check if current user is admin
        const currentUser = await GetUser()
        console.log("Current user:", currentUser)

        if (currentUser?.role === "admin") {
          setIsAdmin(true)
          await loadClients()
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

  const loadClients = async () => {
    setIsLoading(true)
    try {
      console.log("Loading clients...")
      const data = await getClients()
      console.log("Clients loaded:", data)
      setClients(data || [])
      setFilteredClients(data || [])
    } catch (error) {
      console.error("Error in loadClients:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim() === "") {
      setFilteredClients(clients)
    } else {
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(value.toLowerCase()) ||
          client.email.toLowerCase().includes(value.toLowerCase()) ||
          (client.organization && client.organization.toLowerCase().includes(value.toLowerCase())),
      )
      setFilteredClients(filtered)
    }
  }

  const handleAddClientSuccess = (newClient: Client) => {
    setClients((prev) => [...prev, newClient])
    setFilteredClients((prev) => [...prev, newClient])
  }

  const handleDeleteClient = (email: string) => {
    setClients((prev) => prev.filter((client) => client.email !== email))
    setFilteredClients((prev) => prev.filter((client) => client.email !== email))
  }

  if (isLoading) {
    return (
      <div className="pageContainer">
        <PageTitle title="Clientes" icon="users" subpages={[]} />
        <div className={styles.loadingContainer}>
          <p>Cargando clientes...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="pageContainer">
        <PageTitle title="Clientes" icon="users" subpages={[]} />
        <div className={styles.unauthorizedContainer}>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pageContainer">
      <PageTitle title="Clientes" icon="users" subpages={[]} />

      <div className={styles.headerContainer}>
        <Searchbar value={searchTerm} onChange={handleSearch} />
        <button className={styles.addButton} onClick={() => setIsAddDialogOpen(true)}>
          Agregar cliente
        </button>
      </div>

      <div className={styles.scrollContainer}>
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientItem
              key={client.email}
              client={client}
              onDelete={handleDeleteClient}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            {searchTerm ? (
              <div className={styles.emptyState}>No se encontraron clientes que coincidan con: {searchTerm}</div>
            ) : (
              <div className={styles.emptyState}>No hay clientes registrados. Agrega uno nuevo.</div>
            )}
          </div>
        )}
      </div>

      <AddClientDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={handleAddClientSuccess}
      />
    </div>
  )
} 