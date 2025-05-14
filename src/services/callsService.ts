import { Call } from '@/types/CallItemTypes';

export async function fetchCalls(projectId?: string): Promise<Call[]> {
  try {
    const url = projectId 
      ? `https://relations-data-api.vercel.app/call/calls?projectID=${projectId}`
      : 'https://relations-data-api.vercel.app/call/calls';
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching calls:", error);
    return [];
  }
}
