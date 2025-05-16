import { Call } from '@/types/CallItemTypes';

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
