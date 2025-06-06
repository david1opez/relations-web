import { registerActivity } from "./activity";

export const analyzeCall = async (transcript: string) => {
  try {
    console.log("Transcripción a analizar:", transcript);

    const response = await fetch(
      "https://x5fruv6w29.execute-api.us-east-2.amazonaws.com/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en el análisis de la llamada:", error);
    return null;
  }
};

export const fetchChaptering = async (transcript: string) => {
  try {
    // Simple base64 encoding using btoa
    console.log(transcript);
    const base64Transcript = btoa(transcript);
    
    console.log('Base64 encoded:', base64Transcript);
    
    const response = await fetch(
      "https://ahmrxixdg2.execute-api.us-east-2.amazonaws.com/transcribe",
      {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain'
        },
        body: base64Transcript,
      }
    );

    console.log('Response status:', response.status);
    console.log('Response:', response);
    
    if (!response.ok) {
      throw new Error(`Error in chaptering API: ${response.statusText}`);
    }

    const data = await response.json();
    return data["chapters"];
  } catch (error) {
    console.error("Error in chaptering request:", error);
    return null;
  }
};

export interface CallHistoryResponse {
  intervals: string[];
  averageDurations: number[];
  positiveSentimentPercentages: number[];
  resolvedPercentages: number[];
}

export interface ProjectUser {
  userID: number;
  name: string;
  projectRole: string;
}

export async function getProjectUsers(projectId: number): Promise<ProjectUser[]> {
  const response = await fetch(`https://relations-data-api.vercel.app/project/projects/${projectId}/users`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch project users');
  }

  return response.json();
}

export async function getCallHistory(projectId: number, interval: 'daily' | 'weekly' | 'monthly', userId?: number): Promise<CallHistoryResponse> {
  const url = new URL('https://relations-data-api.vercel.app/call/history');
  url.searchParams.append('projectID', projectId.toString());
  url.searchParams.append('interval', interval);
  if (userId) {
    url.searchParams.append('userID', userId.toString());
  }
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error('Failed to fetch call history data');
  }

  return response.json();
}

