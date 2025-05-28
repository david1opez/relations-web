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
}

export default function CallComponent({ call, onClick, onDelete }: CallComponentProps) {
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case "view":
        onClick(call.callID);
        break;
      case "assign":
        setIsAssignProjectOpen(true);
        break;
      case "delete":
        onDelete?.(call.callID);
        break;
    }
  };

  return (
    <>
      <div className={styles.callCard}>

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
            handleMenuItemClick(option === 'Eliminar' ? 'delete' : option === 'Asignar a proyecto' ? 'assign' : 'view');
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