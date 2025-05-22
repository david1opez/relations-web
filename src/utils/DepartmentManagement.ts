import { apiRequest } from './api-helpers';

export interface Department {
  departmentID: number;
  name: string;
}

/**
 * Gets all departments
 */
export async function getDepartments(): Promise<Department[]> {
  try {
    const data = await apiRequest('/department', 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
} 