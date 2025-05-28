export type CallItemProps = {
    call : Call;
    onClick: (id: string) => void;
};

export type CallDetails = {
  finalSatisfaction: string;
  llmInsights: {
    estado_emocional_final: string;
    motivo_llamada: string;
    razon_resolucion: string;
    resumen: string;
    se_resolvio: boolean;
  };
  ociAnalysis: {
    documentSentiment: string;
    lastSentence: string;
    lastSentiment: string;
    relevantAspects: Array<{
      text: string;
      sentiment: string;
      confidence: number;
    }>;
  };
};

export type Call = {
  callID: string;
  title: string;
  startTime: number;
  endTime: number;
  summary: string;
  attendees?: string[];
  details? : CallDetails;
  analyzed?: boolean;
}