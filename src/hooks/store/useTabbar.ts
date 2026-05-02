import { create } from "zustand";

interface TabbarState {
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
}

export const useTabbar = create<TabbarState>((set) => ({
  minimized: false,
  setMinimized: (minimized: boolean) => set({ minimized }),
}));
