interface CreateReportData {
  reportType: string;
  fileURL: string;
  projectID: number;
}

export async function createReport(data: CreateReportData) {
  try {
    // TODO: Replace with your actual backend URL if different from the calls service example
    const url = `https://relations-data-api.vercel.app/report/reports`; 
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating report: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating report:", error);
    throw error; // Re-throw to be handled by the calling component
  }
} 