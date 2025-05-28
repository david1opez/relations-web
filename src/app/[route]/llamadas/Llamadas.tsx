// src/app/route/llamadas/llamadas.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./llamadas.module.css"; 

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import CallComponent from "@/components/CallComponent/CallComponent";
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";
import CallInsightsPopup from "@/components/CallComponent/CallInsightsPopup";
import Searchbar from "@/components/searchbar/Searchbar";

// UTILS
import { analyzeCall } from "@/app/CallAnalysisAPI";
import { calcDuration, parseDate } from "@/utils/dateUtils";
import { Call, CallDetails } from "@/types/CallItemTypes";
import { fetchCalls } from '@/services/callsService';

export default function Llamadas() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);

  const [analyzed, setAnalyzed] = useState<Call[]>([]);
  const [notAnalyzed, setNotAnalyzed] = useState<Call[]>([]);

  const handleViewDetails = async (id: string) => {
    setLoading(true);
    //PENDING
    setLoading(false);
    setShowDetails(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    //PENDING
    setLoading(false);
  };

  const handleAnalyze = (id: string) => {
    const call = notAnalyzed.find((call) => call.callID === id);
    setAnalyzed((prev) => [...prev, call!]);
    setNotAnalyzed((prev) => prev.filter((call) => call.callID !== id));
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchCalls(3);
        setAnalyzed(data.filter((call)=>call.analyzed));
        setNotAnalyzed(data.filter((call)=>!call.analyzed));
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <PageTitle
        title="Llamadas"
        icon="phone"
        subpages={[]}
        onBack={showDetails ? () => setShowDetails(false) : undefined}
      />

      {!showDetails ? (
        <div className={styles.contentContainer}>
          
          <div className={styles.sectionContainer}>
            <h2 className={styles.listTitle}>Por analizar</h2>
            
            <Searchbar/>
            
            <div className={styles.callsContainer}>
              {notAnalyzed.map((call) => (
                <CallComponent
                  key={call.callID}
                  call={call}
                  onClick={(id) => {}}
                  onAnalyze={() => handleAnalyze(call.callID)}
                />
              ))}
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.listTitle}>Analizadas</h2>

            <Searchbar/>
            
            <div className={styles.callsContainer}>
              {analyzed.map((call) => (
                <div key={call.callID} className={styles.assignedCall}>
                  <div className={styles.callInfo}>
                    <p className={styles.callTitle}>{call.title}</p>
                    <p className={styles.callAttendees}>
                      Asistentes: {call.attendees?.join(", ")}
                    </p>
                    <div className={styles.callMeta}>
                      <span>{parseDate(call.startTime)}</span>
                      <span>{calcDuration(call.startTime, call.endTime)}</span>
                    </div>
                  </div>
                  <div className={styles.callActions}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(call.callID)}
                    >
                      Eliminar
                    </button>
                    <button
                      className={styles.acceptButton}
                      onClick={() => handleViewDetails(call.callID)}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CallInsightsPopup
          selectedCall={selectedCall}
          callDetails={callDetails}
          loading={loading}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}