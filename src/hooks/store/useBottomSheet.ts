import { create } from "zustand";

interface BottomSheetStore {
  expanded: boolean;
  expandSheet: () => void;
  collapseSheet: () => void;
}

export const useBottomSheet = create<BottomSheetStore>((set) => ({
  expanded: false,
  expandSheet: () => set({ expanded: true }),
  collapseSheet: () => set({ expanded: false }),
}));
