import { useEffect, useState } from "react";
import styles from "./llamadas.module.css";

// COMPONENTS
import Searchbar from "@/components/searchbar/Searchbar";
import CallComponent from "@/components/CallComponent/CallComponent";


// TYPES (ajústalo si tienes una interfaz real)
interface Call {
  id: string;
  title: string;
  attendees: string[];
  date: string;
  duration: string;
}

export default function Llamadas({ id }: { id: string }) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);

  useEffect(() => {
    // Aquí pones el fetch real en tu proyecto
    const demoCalls: Call[] = Array(5).fill(0).map((_, i) => ({
      id: `${i}`,
      title: "Reunión inicial con cliente",
      attendees: ["María García", "Roberto Sánchez", "Cliente"],
      date: "10/04/2025",
      duration: "32m 3s"
    }));
    setCalls(demoCalls);
    setFilteredCalls(demoCalls);
  }, []);

  const handleSearch = (value: string) => {
    const filtered = calls.filter(call =>
      call.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCalls(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Searchbar onChange={handleSearch} />
      </div>

      <div className={styles.callsList}>

      {filteredCalls.map((call) => (
        <CallComponent
          key={call.id}
          call={{
            id: call.id,
            title: call.title,
            attendees: call.attendees,
            startDate: new Date("2025-04-10T12:00:00").getTime(),
            endDate: new Date("2025-04-10T12:32:03").getTime(),
            transcript: "Transcripción de la llamada",
          }}
          onClick={(id) => console.log("Ver detalles de:", id)}
        />
      ))}

      </div>
    </div>
  );
}