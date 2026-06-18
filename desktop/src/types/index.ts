// ========================
// Auth Types
// ========================
export interface User {
  id: number;
  personnel_id: number;
  username: string;
  role_id: number;
  role_code: RoleCode;
  role_name: string;
  is_active: number;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  im: string;
  lastname: string;
  firstname: string;
  grade: string;
  fonction: string;
}

export type RoleCode =
  | "SUPER_ADMIN"
  | "CHIEF"
  | "STATION_ADMIN"
  | "HEAD_SG"
  | "HEAD_SED"
  | "HEAD_PJ"
  | "INVESTIGATOR"
  | "OFFICER"
  | "RECEPTION"
  | "CLERK"
  | "CUSTODY";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface Division {
  code: string;
  label: string;
  description: string;
}

// ========================
// Personnel Types
// ========================
export interface Personnel {
  id: number;
  im: string;
  lastname: string;
  firstname: string;
  grade: string;
  fonction: string;
  email: string | null;
  phone: string | null;
  photo: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// ========================
// Role Types
// ========================
export interface Role {
  id: number;
  code: string;
  name: string;
  description: string | null;
}

// ========================
// API Response Types
// ========================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ========================
// Navigation Types
// ========================
export interface NavItem {
  icon: string;
  label: string;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ========================
// Legacy Types (keep for compatibility)
// ========================
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  pinned: boolean;
}

export interface RecentFile {
  id: string;
  name: string;
  path: string;
  lastOpened: Date;
}

export interface Command {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
}

export type Theme = "dark" | "light";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export interface AppSettings {
  theme: Theme;
  sidebarOpen: boolean;
  sidebarWidth: number;
  fontSize: number;
  showStatusBar: boolean;
}
