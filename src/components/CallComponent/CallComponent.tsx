import { useState } from "react";
import styles from "./CallComponent.module.css";

// COMPONENTS
import OptionsMenu from "../optionsMenu/OptionsMenu";
import AssignProjectPopup from "./AssignProjectPopup";
import MetadataItem from "../metadataItem/MetadataItem";

// UTILS
import { calcDuration, parseDate } from "@/utils/dateUtils";
import Icon from "../icon/Icon";

interface Call {
  id: string;
  title: string;
  startDate: number;
  endDate: number;
  transcript: string;
  attendees: string[];
}

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
        onClick(call.id);
        break;
      case "assign":
        setIsAssignProjectOpen(true);
        break;
      case "delete":
        onDelete?.(call.id);
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
          value={call.attendees.join(", ")}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <MetadataItem
            icon="calendar"
            title="Fecha:"
            value={parseDate(call.startDate)}
          />

          <MetadataItem
            icon="clock"
            title="Duración:"
            value={calcDuration(call.startDate, call.endDate)}
          />
        </div>

        <OptionsMenu
          options={[
            { icon: 'rocket', name: 'Asignar a proyecto' },
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
        attendees={call.attendees}
        date={parseDate(call.startDate)}
        duration={calcDuration(call.startDate, call.endDate)}
      />
    </>
  );
}