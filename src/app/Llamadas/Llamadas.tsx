import { useState } from "react";
import styles from "./Llamadas.module.css";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
import CallAnalysisPage from "../CallAnalysisPage"; // Ajusta la ruta si es necesario
import { analyzeCall } from "@/app/CallAnalysisAPI";

export default function Llamadas() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // 📌 Simulación de llamadas disponibles
  const calls = [
    {
      id: "1",
      title: "Llamada con Soporte - Facturación",
      transcript:
        "Llamé al servicio al cliente porque tenía problemas con mi factura. El agente fue amable y me explicó todo claramente, pero al final no resolvieron nada. Tuve que llamar de nuevo y todavía no me dan una solución.",
    },
    {
      id: "2",
      title: "Llamada con Ventas - Promoción",
      transcript:
        "Llamé para preguntar sobre una promoción. Me explicaron los detalles, pero al final decidí no tomarla.",
    },
  ];

  // 📌 Manejar selección de llamada y análisis de sentimientos
  const handleSelectCall = async (transcript: string) => {
    setSelectedCall(transcript);
    setAnalysisData(null);
    setLoading(true);

    const data = await analyzeCall(transcript);
    setAnalysisData(data);
    setLoading(false);
  };

  return (
    <div className={styles.pageContainer}>
      <PageIndicator
        icon="phone"
        title="Llamadas"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      {/* 📌 Lista de llamadas */}
      <div className="grid gap-4">
        {calls.map((call) => (
          <div key={call.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-bold">{call.title}</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleSelectCall(call.transcript)}
            >
              Acceder
            </button>
          </div>
        ))}
      </div>

      {/* 📌 Mostrar análisis si ya se obtuvo */}
      {loading && (
        <p className="text-center text-gray-500">Analizando llamada...</p>
      )}
      {analysisData && <CallAnalysisPage analysisData={analysisData} />}
    </div>
  );
}
