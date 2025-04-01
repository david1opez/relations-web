export const analyzeCall = async (transcript: string) => {
  try {
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
