import type React from "react";
import styles from "./AddProjectPopup.module.css";
import { useState, useEffect, useRef } from "react";

interface AddProjectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

interface Client {
  email: string;
  name: string;
  organization?: string;
  description?: string;
}

export default function AddProjectPopup({ isOpen, onClose, onProjectAdded }: AddProjectPopupProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [reqFuncionales, setReqFuncionales] = useState("");
  const [reqNoFuncionales, setReqNoFuncionales] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientDescription, setClientDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoadingClients, setIsLoadingClients] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (isOpen) {
      fetchClients()
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchClients = async () => {
    try {
      setIsLoadingClients(true)
      const response = await fetch("https://relations-data-api.vercel.app/client/clients")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error("Error fetching clients:", error)
    } finally {
      setIsLoadingClients(false)
    }
  }
 /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onProjectAdded();
    }, 1000);
  };
*/

  // Filtrar clientes basado en el término de búsqueda
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      (client.organization && client.organization.toLowerCase().includes(clientSearchTerm.toLowerCase())),
  )

  // Seleccionar un cliente del dropdown
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client)
    setClientEmail(client.email)
    setIsDropdownOpen(false)
    setClientSearchTerm("")
  }

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // DEPURACIÓN: Mostrar el cliente seleccionado y los datos a enviar
    console.log("selectedClient:", selectedClient);
    if (!selectedClient) {
      alert("Debes seleccionar un cliente del listado.");
      setLoading(false);
      return;
    }
    const projectData = {
      name,
      description,
      client: selectedClient ? {
        email: selectedClient.email,
        name: selectedClient.name,
        organization: selectedClient.organization,
        description: selectedClient.description
      } : null,
      problemDescription,
      reqFuncionales,
      reqNoFuncionales,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
      users: [],
    }
    console.log("projectData:", projectData);

    try {
      // Enviar los datos a la API
      const response = await fetch("https://relations-data-api.vercel.app/project/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Proyecto añadido con éxito
      onProjectAdded()
      onClose()
    } catch (error) {
      console.error("Error adding project:", error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M26.667 10.667H5.333c-.736 0-1.333.597-1.333 1.333v13.333c0 .737.597 1.334 1.333 1.334h21.334c.736 0 1.333-.597 1.333-1.334V12c0-.736-.597-1.333-1.333-1.333z"
                stroke="#B4E1F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.333 10.667V8c0-.736-.597-1.333-1.333-1.333h-8c-.736 0-1.333.597-1.333 1.333v2.667"
                stroke="#B4E1F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Agregar Proyecto</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre del proyecto</label>
            <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción del proyecto</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Dropdown de clientes mejorado */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente</label>
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <div
                className={`${styles.dropdownInput} ${isDropdownOpen ? styles.dropdownInputActive : ""}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedClient ? (
                  <div className={styles.selectedClient}>
                    <span className={styles.selectedClientName}>{selectedClient.name}</span>
                    {selectedClient.organization && (
                      <span className={styles.selectedClientOrg}>({selectedClient.organization})</span>
                    )}
                  </div>
                ) : (
                  <input
                    className={styles.input}
                    value={clientSearchTerm}
                    onChange={(e) => {
                      setClientSearchTerm(e.target.value)
                      setIsDropdownOpen(true)
                    }}
                    placeholder="Buscar cliente..."
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <div className={styles.dropdownIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  {selectedClient && (
                    <div className={styles.searchContainer}>
                      <input
                        className={styles.searchInput}
                        value={clientSearchTerm}
                        onChange={(e) => setClientSearchTerm(e.target.value)}
                        placeholder="Buscar cliente..."
                        autoFocus
                      />
                    </div>
                  )}

                  {isLoadingClients ? (
                    <div className={styles.dropdownLoading}>
                      <div className={styles.spinner}></div>
                      <span>Cargando clientes...</span>
                    </div>
                  ) : filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <div
                        key={client.email}
                        className={styles.dropdownItem}
                        onClick={() => handleSelectClient(client)}
                      >
                        <div className={styles.clientInfo}>
                          <div className={styles.clientName}>{client.name}</div>
                          <div className={styles.clientMeta}>
                            <span className={styles.clientEmail}>{client.email}</span>
                            {client.organization && <span className={styles.clientOrg}>{client.organization}</span>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.dropdownEmpty}>
                      <span>No se encontraron clientes</span>
                      <button className={styles.addClientBtn} type="button">
                        + Agregar nuevo cliente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mostrar descripción del cliente seleccionado */}
            {selectedClient && selectedClient.description && (
              <div className={styles.clientDescription}>
                <p>{selectedClient.description}</p>
                <button
                  type="button"
                  className={styles.changeClientBtn}
                  onClick={() => {
                    setSelectedClient(null)
                    setClientEmail("")
                    setIsDropdownOpen(true)
                  }}
                >
                  Cambiar cliente
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción de la Problematica</label>
            <textarea
              className={styles.textarea}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Requerimientos Funcionales</label>
            <textarea
              className={styles.textarea}
              value={reqFuncionales}
              onChange={(e) => setReqFuncionales(e.target.value)}
              rows={3}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Requerimientos no Funcionales</label>
            <textarea
              className={styles.textarea}
              value={reqNoFuncionales}
              onChange={(e) => setReqNoFuncionales(e.target.value)}
              rows={3}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de inicio</label>
              <input
                className={styles.input}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de entrega</label>
              <input
                className={styles.input}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.addButton} type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className={styles.buttonSpinner}></div>
                <span>Guardando...</span>
              </>
            ) : (
              "Agregar Proyecto"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


  /*
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.667 10.667H5.333c-.736 0-1.333.597-1.333 1.333v13.333c0 .737.597 1.334 1.333 1.334h21.334c.736 0 1.333-.597 1.333-1.334V12c0-.736-.597-1.333-1.333-1.333z" stroke="#B4E1F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21.333 10.667V8c0-.736-.597-1.333-1.333-1.333h-8c-.736 0-1.333.597-1.333 1.333v2.667" stroke="#B4E1F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Agregar Proyecto</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre del proyecto</label>
            <input className={styles.input} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción del proyecto</label>
            <textarea className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente</label>
            <input className={styles.input} value={client} onChange={e => setClient(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción de la Problematica</label>
            <textarea className={styles.input} value={problemDescription} onChange={e => setProblemDescription(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Requerimientos Funcionales</label>
            <textarea className={styles.input} value={reqFuncionales} onChange={e => setReqFuncionales(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Requerimientos no Funcionales</label>
            <textarea className={styles.input} value={reqNoFuncionales} onChange={e => setReqNoFuncionales(e.target.value)} />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de inicio</label>
              <input className={styles.input} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de entrega</label>
              <input className={styles.input} type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <button className={styles.addButton} type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Agregar Proyecto"}
          </button>
        </form>
      </div>
    </div>
  );
} */