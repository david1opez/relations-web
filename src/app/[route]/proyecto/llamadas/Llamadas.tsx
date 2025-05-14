import styles from './llamadas.module.css';
import { useEffect, useState } from "react";

// COMPONENTS
import Searchbar from '@/components/searchbar/Searchbar';
import CallItem from '@/components/callItem/CallItem';

import { analyzeCall } from '@/utils/CallAnalysisAPI';
import { CallItemProps, CallDetails, Call } from '@/types/CallItemTypes';

export default function Llamadas({ id }: { id:string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [calls, setCalls] = useState<Call[]>([]);
    const [selectedCall, setSelectedCall] = useState<Call|null>(null);
    const [callDetails, setCallDetails] = useState<CallDetails|null>(null);
    
    const fetchCalls = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://relations-data-api.vercel.app/call/calls?projectID=" + id);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response}`);
            }
            const data: Call[] = await response.json();
            setCalls(data);
        } catch (error) {
            console.error("Error fetching calls:", error);
            setCalls([]);
        } finally {
            setLoading(false);
        }
    };

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
            await fetchCalls();
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    };
        loadInitialData();
    }, [id]);

    return (
        <div className={styles.container}>
            <Searchbar/>
            <div className={styles.container}>
                {loading ? (
                    <p>Cargando...</p>
                ) : calls.length > 0 ? (
                    calls.map((call) => (
                        <CallItem
                            key={call.callID}
                            call={call}
                            onClick={() => handleSelectCall(call.callID)}
                        />
                    ))
                ) : (
                    <p>No hay llamadas disponibles</p>
                )}
            </div>
        </div>
    );
}
