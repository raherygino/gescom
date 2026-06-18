import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Personnel } from "@/types";

export async function getPersonnelList(
  filters?: Record<string, string>,
): Promise<Personnel[]> {
  const params = new URLSearchParams(filters);
  const query = params.toString();
  const { data } = await apiClient.get<ApiResponse<Personnel[]>>(
    `/personnel${query ? `?${query}` : ""}`,
  );
  return data.data;
}

export async function getAvailablePersonnel(): Promise<Personnel[]> {
  const { data } = await apiClient.get<ApiResponse<Personnel[]>>(
    "/personnel/available",
  );
  return data.data;
}

export async function getPersonnelById(id: number): Promise<Personnel> {
  const { data } = await apiClient.get<ApiResponse<Personnel>>(
    `/personnel/${id}`,
  );
  return data.data;
}

export async function createPersonnel(
  personnel: Omit<Personnel, "id" | "created_at" | "updated_at" | "photo"> & {
    photo?: string;
  },
): Promise<Personnel> {
  const { data } = await apiClient.post<ApiResponse<Personnel>>(
    "/personnel",
    personnel,
  );
  return data.data;
}

export async function updatePersonnel(
  id: number,
  personnel: Partial<Personnel>,
): Promise<Personnel> {
  const { data } = await apiClient.put<ApiResponse<Personnel>>(
    `/personnel/${id}`,
    personnel,
  );
  return data.data;
}

export async function deletePersonnel(id: number): Promise<void> {
  await apiClient.delete(`/personnel/${id}`);
}
