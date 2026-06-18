import { apiClient } from "@/lib/api-client";
import type { ApiResponse, User } from "@/types";

export async function getUserList(): Promise<User[]> {
  const { data } = await apiClient.get<ApiResponse<User[]>>("/users");
  return data.data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return data.data;
}

export async function createUser(user: {
  personnel_id: number;
  username: string;
  password: string;
  role_id: number;
}): Promise<User> {
  const { data } = await apiClient.post<ApiResponse<User>>("/users", user);
  return data.data;
}

export async function updateUser(
  id: number,
  user: Partial<{
    username: string;
    password: string;
    role_id: number;
    is_active: number;
  }>,
): Promise<User> {
  const { data } = await apiClient.put<ApiResponse<User>>(
    `/users/${id}`,
    user,
  );
  return data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
