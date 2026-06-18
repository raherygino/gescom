import { create } from "zustand";

interface WindowState {
  maximized: boolean;
  focused: boolean;
  platform: "win32" | "darwin" | "linux" | "unknown";
  setMaximized: (maximized: boolean) => void;
  setFocused: (focused: boolean) => void;
  setPlatform: (platform: "win32" | "darwin" | "linux" | "unknown") => void;
}

export const useWindowStore = create<WindowState>()((set) => ({
  maximized: false,
  focused: true,
  platform: "unknown",
  setMaximized: (maximized) => set({ maximized }),
  setFocused: (focused) => set({ focused }),
  setPlatform: (platform) => set({ platform }),
}));
