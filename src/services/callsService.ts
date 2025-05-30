import { Call } from '@/types/CallItemTypes';
import { parseVTT } from '@/utils/vttHelpers';

export async function fetchCalls(projectId: number): Promise<Call[]> {
  try {
    const url = `https://relations-data-api.vercel.app/call/calls?projectID=${projectId}`;      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error("Error fetching calls:", error);
    return [];
  }
}

export async function analyzeCall(callID: string, text: string) {
  text = parseVTT(text);
  const response = await fetch('https://x5fruv6w29.execute-api.us-east-2.amazonaws.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callID,
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error analyzing call: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log("✅ API Response:", result);
  return result;
}

export async function fetchCallSentimentAnalysis(callID: string) {
  const response = await fetch(`https://x5fruv6w29.execute-api.us-east-2.amazonaws.com/analysis?callID=${callID}`);
  if (!response.ok) {
    throw new Error(`Error obteniendo el análisis de llamada ${callID}`);
  }

  const data = await response.json();
  const result = data.result?.resultado;

  if (!result) {
    throw new Error("No se encontró análisis en la respuesta.");
  }

  console.log("📊 Análisis recibido:", result);
  return result;

}

