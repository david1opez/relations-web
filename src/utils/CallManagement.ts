/**
 * Deletes a call by its ID
 * @param callID - The ID of the call to delete
 * @returns Promise that resolves when the call is deleted
 * @throws Error if the deletion fails
 */
export async function deleteCall(callID: string): Promise<void> {
  const response = await fetch(`https://relations-data-api.vercel.app/call/delete?callID=${callID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la llamada');
  }
} 