// src/app/route/llamadas/llamadas.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./llamadas.module.css";
import { analyzeCall } from '@/services/callsService'; 
import { fetchCallSentimentAnalysis } from "@/services/callsService";

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import CallComponent from "@/components/CallComponent/CallComponent";
import CallInsightsPopup from "@/components/CallComponent/CallInsightsPopup";
import Searchbar from "@/components/searchbar/Searchbar";
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";

// UTILS
import { Call, CallDetails } from "@/types/CallItemTypes";
import { fetchCalls } from '@/services/callsService';
import CallItem from "@/components/callItem/CallItem";
import { deleteCall } from "@/utils/CallManagement";

export default function Llamadas() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null); // Track which call is being deleted

  const [analyzed, setAnalyzed] = useState<Call[]>([]);
  const [notAnalyzed, setNotAnalyzed] = useState<Call[]>([]);
  // Add these new states for filtered results
  const [filteredAnalyzed, setFilteredAnalyzed] = useState<Call[]>([]);
  const [filteredNotAnalyzed, setFilteredNotAnalyzed] = useState<Call[]>([]);

  const handleViewDetails = async (id: string) => {
    setLoading(true);

    try {
      const call = analyzed.find((c) => c.callID === id);
      if (!call) return;

      setSelectedCall(call);

      const details = await fetchCallSentimentAnalysis(id);
      setCallDetails(details);

      setShowDetails(true);
    } catch (error) {
      console.error("Error al obtener análisis de sentimientos:", error);
      alert("Error al cargar detalles de la llamada.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(id);
      
      await deleteCall(id);
      
      // Update both analyzed and not analyzed states
      setAnalyzed(prev => prev.filter(call => call.callID !== id));
      setNotAnalyzed(prev => prev.filter(call => call.callID !== id));
      setFilteredAnalyzed(prev => prev.filter(call => call.callID !== id));
      setFilteredNotAnalyzed(prev => prev.filter(call => call.callID !== id));
      
      console.log(`Llamada eliminada correctamente`);
    } catch (error) {
      console.error("Error al eliminar la llamada:", error);
      alert("No se pudo eliminar la llamada. Por favor, inténtalo de nuevo.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAnalyze = async (id: string) => {
    const call = notAnalyzed.find((call) => call.callID === id);
    if (!call || !call.summary) return;

    try {
      // 1. Llamar al endpoint de análisis
      await analyzeCall(call.callID, call.summary);

      // 2. Llamar al endpoint que marca isAnalyzed = true en la BD
      await fetch("https://relations-data-api.vercel.app/call/markAnalyzed", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callID: call.callID }),
      });

      // 3. Actualizar el estado local del frontend
      const updatedCall = { ...call, isAnalyzed: true };
      setAnalyzed((prev) => [...prev, updatedCall]);
      setFilteredAnalyzed((prev) => [...prev, updatedCall]);
      setNotAnalyzed((prev) => prev.filter((c) => c.callID !== id));
      setFilteredNotAnalyzed((prev) => prev.filter((c) => c.callID !== id));

    } catch (error) {
      console.error("Error al analizar llamada:", error);
      alert("Ocurrió un error al analizar la llamada ");
    }
  };


  // Add search handlers for both sections
  const handleSearchAnalyzed = (value: string) => {
    if (value.trim() === "") {
      setFilteredAnalyzed(analyzed);
    } else {
      const searchTerm = value.toLowerCase();
      const filtered = analyzed.filter((call) =>
        (call.title.toLowerCase() || '').includes(searchTerm) ||
        (call.summary?.toLowerCase() || '').includes(searchTerm) ||
        call.attendees?.some(attendee => 
          (attendee?.toLowerCase() || '').includes(searchTerm)
        )
      );
      setFilteredAnalyzed(filtered);
    }
  };

  const handleSearchNotAnalyzed = (value: string) => {
    if (value.trim() === "") {
      setFilteredNotAnalyzed(notAnalyzed);
    } else {
      const searchTerm = value.toLowerCase();
      const filtered = notAnalyzed.filter((call) =>
        (call.title.toLowerCase() || '').includes(searchTerm) ||
        call.attendees?.some(attendee => 
          (attendee?.toLowerCase() || '').includes(searchTerm)
        )
      );
      setFilteredNotAnalyzed(filtered);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchCalls(3);
        const analyzedCalls = data.filter((call) => call.isAnalyzed);
        const notAnalyzedCalls = data.filter((call) => !call.isAnalyzed);
        setAnalyzed(analyzedCalls);
        setNotAnalyzed(notAnalyzedCalls);
        // Initialize filtered arrays
        setFilteredAnalyzed(analyzedCalls);
        setFilteredNotAnalyzed(notAnalyzedCalls);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <PageTitle
          title="Llamadas"
          icon="phone"
          subpages={[]}
        />
        <div className={styles.loadingContainer}>
          <ActivityIndicator size={40} color="var(--accent)" />
        </div>
      </div>
    )
  }

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
            <div className={styles.sectionHeader}>
              <h2 className={styles.listTitle}>Por analizar</h2>
              {/* {notAnalyzed.length > 0 && (
                <button 
                  className={styles.analyzeAllButton}
                >
                  Analizar todas
                </button>
              )} */}
            </div>
            
            <Searchbar onChange={handleSearchNotAnalyzed}/>
            
            <div className={styles.callsContainer}>
              {filteredNotAnalyzed.map((call) => (
                <CallComponent
                  key={call.callID}
                  call={call}
                  onClick={(id) => {}}
                  onAnalyze={() => handleAnalyze(call.callID)}
                  onDelete={handleDelete}
                  loading={deleteLoading === call.callID}
                />
              ))}
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.listTitle}>Analizadas</h2>

            <Searchbar onChange={handleSearchAnalyzed}/>

            <div className={styles.callsContainer}>
              {filteredAnalyzed.map((call) => (
                <CallItem
                  key={call.callID}
                  call={call}
                  onClick={handleViewDetails}
                />
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