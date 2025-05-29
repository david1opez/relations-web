// src/app/route/llamadas/llamadas.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./llamadas.module.css"; 

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle";
import CallComponent from "@/components/CallComponent/CallComponent";
import CallInsightsPopup from "@/components/CallComponent/CallInsightsPopup";
import Searchbar from "@/components/searchbar/Searchbar";

// UTILS
import { Call, CallDetails } from "@/types/CallItemTypes";
import { fetchCalls } from '@/services/callsService';
import CallItem from "@/components/callItem/CallItem";

export default function Llamadas() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);

  const [analyzed, setAnalyzed] = useState<Call[]>([]);
  const [notAnalyzed, setNotAnalyzed] = useState<Call[]>([]);
  // Add these new states for filtered results
  const [filteredAnalyzed, setFilteredAnalyzed] = useState<Call[]>([]);
  const [filteredNotAnalyzed, setFilteredNotAnalyzed] = useState<Call[]>([]);

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
    if (!call) return;
    setAnalyzed((prev) => [...prev, call!]);
    setFilteredAnalyzed((prev) => [...prev, call!]);
    setNotAnalyzed((prev) => prev.filter((call) => call.callID !== id));
    setFilteredNotAnalyzed((prev) => prev.filter((call) => call.callID !== id));
  }

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
        (call.summary?.toLowerCase() || '').includes(searchTerm) ||
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
            
            <Searchbar onChange={handleSearchNotAnalyzed}/>
            
            <div className={styles.callsContainer}>
              {filteredNotAnalyzed.map((call) => (
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