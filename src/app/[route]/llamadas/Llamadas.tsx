// src/app/route/llamadas/llamadas.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./llamadas.module.css";
import { analyzeCall, fetchCallSentimentAnalysis, fetchCalls } from "@/services/callsService";

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import CallComponent from "@/components/CallComponent/CallComponent";
import CallInsightsPopup from "@/components/CallComponent/CallInsightsPopup";
import Searchbar from "@/components/searchbar/Searchbar";
import CallItem from "@/components/callItem/CallItem";

// UTILS
import { Call, CallDetails } from "@/types/CallItemTypes";
import { deleteCall } from "@/utils/CallManagement";

export default function Llamadas() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [analyzingLoading, setAnalyzingLoading] = useState<{ [key: string]: boolean }>({});
  const [analyzingAll, setAnalyzingAll] = useState(false);

  const [analyzed, setAnalyzed] = useState<Call[]>([]);
  const [notAnalyzed, setNotAnalyzed] = useState<Call[]>([]);
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
      
      setAnalyzed(prev => prev.filter(call => call.callID !== id));
      setNotAnalyzed(prev => prev.filter(call => call.callID !== id));
      setFilteredAnalyzed(prev => prev.filter(call => call.callID !== id));
      setFilteredNotAnalyzed(prev => prev.filter(call => call.callID !== id));
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

    setAnalyzingLoading(prev => ({ ...prev, [id]: true }));

    try {
      await analyzeCall(call.callID, call.summary);
      await fetch("https://relations-data-api.vercel.app/call/markAnalyzed", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callID: call.callID }),
      });

      const updatedCall = { ...call, isAnalyzed: true };
      setAnalyzed((prev) => [...prev, updatedCall]);
      setFilteredAnalyzed((prev) => [...prev, updatedCall]);
      setNotAnalyzed((prev) => prev.filter((c) => c.callID !== id));
      setFilteredNotAnalyzed((prev) => prev.filter((c) => c.callID !== id));

    } catch (error) {
      console.error("Error al analizar llamada:", error);
      alert("Ocurrió un error al analizar la llamada ");
    } finally {
      setAnalyzingLoading(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleAnalyzeAll = async () => {
    setAnalyzingAll(true);

    try {
      await Promise.all(
        notAnalyzed.map(async (call) => {
          if (!call.summary) return;

          setAnalyzingLoading(prev => ({ ...prev, [call.callID]: true }));

          try {
            await analyzeCall(call.callID, call.summary);

            await fetch("https://relations-data-api.vercel.app/call/markAnalyzed", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ callID: call.callID }),
            });

            const updatedCall = { ...call, isAnalyzed: true };

            setAnalyzed(prev => [...prev, updatedCall]);
            setFilteredAnalyzed(prev => [...prev, updatedCall]);
            setNotAnalyzed(prev => prev.filter(c => c.callID !== call.callID));
            setFilteredNotAnalyzed(prev => prev.filter(c => c.callID !== call.callID));

          } catch (error) {
            console.error(`Error al analizar la llamada ${call.callID}:`, error);
          } finally {
            setAnalyzingLoading(prev => {
              const copy = { ...prev };
              delete copy[call.callID];
              return copy;
            });
          }
        })
      );
    } finally {
      setAnalyzingAll(false);
    }
  };

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
            </div>

            <div className={styles.searchAndButton}>
              <Searchbar onChange={handleSearchNotAnalyzed} />
              <button
                className={styles.analyzeAllButton}
                onClick={handleAnalyzeAll}
                disabled={filteredNotAnalyzed.length === 0 || analyzingAll}
              >
                {analyzingAll ? "Analizando..." : "Analizar Llamadas"}
              </button>
            </div>

            <div className={styles.callsContainer}>
              {filteredNotAnalyzed.map((call) => (
                <CallComponent
                  key={call.callID}
                  call={call}
                  onClick={() => {}}
                  onAnalyze={() => handleAnalyze(call.callID)}
                  onDelete={handleDelete}
                  loading={deleteLoading === call.callID || analyzingLoading[call.callID]}
                />
              ))}
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.listTitle}>Analizadas</h2>

            <Searchbar onChange={handleSearchAnalyzed} />

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