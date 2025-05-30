import { useState } from "react";
import styles from "./CallComponent.module.css";

// COMPONENTS
import OptionsMenu from "../optionsMenu/OptionsMenu";
import AssignProjectPopup from "./AssignProjectPopup";
import MetadataItem from "../metadataItem/MetadataItem";
import Dialog from "../dialog/Dialog";

// UTILS
import { calcDuration, parseDate } from "@/utils/dateUtils";
import { Call } from "@/types/CallItemTypes";

interface CallComponentProps {
  call: Call;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
  onAnalyze?: (id: string) => void;
  loading?: boolean;
}

export default function CallComponent({ call, onClick, onDelete, onAnalyze, loading: externalLoading }: CallComponentProps) {
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  
  // Use either external or internal loading state
  const loading = externalLoading ?? internalLoading;

  const handleMenuItemClick = async (action: string) => {
    switch (action) {
      case "view":
        onClick(call.callID);
        break;
      case "analyze":
        setInternalLoading(true);
        try {
          await onAnalyze?.(call.callID);
        } finally {
          setInternalLoading(false);
        }
        break;
      case "delete":
        setIsDeleteDialogOpen(true);
        break;
    }
  };

  const handleDelete = async () => {
    try {
      setInternalLoading(true);
      await onDelete?.(call.callID);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error al eliminar la llamada:", error);
      alert("Ocurrió un error al eliminar la llamada");
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <>
      <div className={styles.callCard}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        )}
        <h3 className={styles.callTitle}>{call.title}</h3>

        <MetadataItem
          icon="users"
          title="Asistentes:"
          value={(call.attendees ?? []).join(", ")}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <MetadataItem
            icon="calendar"
            title="Fecha:"
            value={parseDate(call.startTime)}
          />

          <MetadataItem
            icon="clock"
            title="Duración:"
            value={calcDuration(call.startTime, call.endTime)}
          />
        </div>

        <OptionsMenu
          options={[
            { icon: 'rocket', name: 'Analizar' },
            { icon: 'pencil', name: 'Ver transcripción' },
            { icon: 'close', name: 'Eliminar' }
          ]} 
          onSelect={(option) => {
            handleMenuItemClick(
              option === 'Analizar' ? 'analyze' : 
              option === 'Ver transcripción' ? 'view' : 
              option === 'Eliminar' ? 'delete' : ''
            );
          }}
        />
      </div>

      <AssignProjectPopup
        isOpen={isAssignProjectOpen}
        onClose={() => setIsAssignProjectOpen(false)}
        title={call.title}
        attendees={call.attendees || []}
        date={parseDate(call.startTime)}
        duration={calcDuration(call.startTime, call.endTime)}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro que quieres eliminar la llamada "${call.title}"?`}
      />
    </>
  );
}