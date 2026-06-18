import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AuthResponse, User } from "@/types";

export async function login(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    { username, password },
  );
  return data.data;
}

export async function refreshToken(
  refresh_token: string,
): Promise<{ access_token: string }> {
  const { data } = await apiClient.post<ApiResponse<{ access_token: string }>>(
    "/auth/refresh",
    { refresh_token },
  );
  return data.data;
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<ApiResponse<User>>("/auth/me");
  return data.data;
}
