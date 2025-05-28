import { useState } from "react";
import styles from "./CallComponent.module.css";

// COMPONENTS
import OptionsMenu from "../optionsMenu/OptionsMenu";
import AssignProjectPopup from "./AssignProjectPopup";
import MetadataItem from "../metadataItem/MetadataItem";

// UTILS
import { calcDuration, parseDate } from "@/utils/dateUtils";
import { Call } from "@/types/CallItemTypes";

interface CallComponentProps {
  call: Call;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
  onAnalyze?: (id: string) => void;
}

export default function CallComponent({ call, onClick, onDelete, onAnalyze }: CallComponentProps) {
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case "view":
        onClick(call.callID);
        break;
      case "analyze":
        setLoading(true);
        setTimeout(() => {
          //call api to analyze call
          setLoading(false);
          onAnalyze?.(call.callID);

        }
        , 5000); // Simulate API call delay

        //onAnalyze?.(call.callID);
        break;
      case "delete":
        onDelete?.(call.callID);
        break;
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
    </>
  );
}