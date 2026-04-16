import { create } from "zustand";

interface TabbarState {
    isMinized: boolean;
    setIsMinized: (minimized: boolean) => void;
}

export const useTabbar = create<TabbarState>((set) => ({
    isMinized: false,
    setIsMinized: (minimized) => set({ isMinized: minimized }),
    toggleMinized: () => set((state) => ({ isMinized: !state.isMinized })),
}));