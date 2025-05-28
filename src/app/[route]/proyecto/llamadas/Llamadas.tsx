import { useEffect, useState } from "react";
import styles from "./llamadas.module.css";

// COMPONENTS
import Searchbar from "@/components/searchbar/Searchbar";
import CallItem from "@/components/callItem/CallItem";
import CallDetailsPopup from '@/components/CallComponent/CallDetailsPopup';

import { analyzeCall, fetchChaptering } from '@/utils/CallAnalysisAPI';
import { CallItemProps, CallDetails, Call } from '@/types/CallItemTypes';
import { fetchCalls } from '@/services/callsService';
import { calcDuration } from "@/utils/dateUtils";

export default function Llamadas({ id }: { id: number }) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleSelectCall = async (cID: string) => {
    setLoading(true);

    let callFound = calls.find((call) => call.callID === cID);
    try {
      const response = await fetch(`https://relations-data-api.vercel.app/call/details?callID=${cID}`);
      callFound = await response.json();
      console.log(callFound?.summary)
      setSelectedCall(callFound as Call);

      // Fetch chapters for the transcript/summary
      const chapterData = await fetchChaptering(callFound?.summary || "");
      setChapters(chapterData || []);
      //get summary from call
      //pending 
      setShowModal(true);
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

      {/* Modal for call details */}
      <CallDetailsPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCall?.title || ''}
        attendees={selectedCall?.attendees || []}
        date={selectedCall ? new Date(selectedCall.startTime).toLocaleDateString() : ''}
        duration={selectedCall ? calcDuration(selectedCall.startTime, selectedCall.endTime) : ''}
        transcript={selectedCall?.summary || ''}
        chapters={chapters}
        summary={summary}
      />
    </div>
  );
}