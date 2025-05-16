import { useEffect, useState } from "react";
import styles from "./llamadas.module.css";

// COMPONENTS
import Searchbar from "@/components/searchbar/Searchbar";
import CallItem from "@/components/callItem/CallItem";

import { analyzeCall } from '@/utils/CallAnalysisAPI';
import { CallItemProps, CallDetails, Call } from '@/types/CallItemTypes';
import { fetchCalls } from '@/services/callsService';
import Call from "@/components/call/Call";

export default function Llamadas({ id }: { id: number }) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);

  const handleSelectCall = async (id: string) => {
    setLoading(true);

    let callFound = calls.find((call) => call.callID === id);
    try {
      const response = await fetch(`https://relations-data-api.vercel.app/call/details?callID=${id}`);
      callFound = await response.json();

      setSelectedCall(callFound as Call);

      const data: CallDetails = await analyzeCall(callFound?.summary || "");

      if (data) 
        setCallDetails(data);
      else 
        console.error("Error fetching call details");
    } catch (error) {
      console.error("Error fetching call details:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchCalls(id);
        setCalls(data);
        setFilteredCalls(data);
        
        console.log("Calls data:", data);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [id]);

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
        <CallItem
          key={call.callID}
          call={call}
          onClick={() => handleSelectCall(call.callID)}
        />
      ))}

      </div>
    </div>
  );
}