import type { PassageRef } from "@/types/bible";
import { create } from "zustand";

interface CurrentPassageStore {
  passage: PassageRef;
  setPassage: (passage: PassageRef) => void;
}

export const useCurrentPassage = create<CurrentPassageStore>((set) => ({
  passage: { book: "Genesis", chapter: 1, verse: 1 },
  setPassage: (passage) => set({ passage }),
}));
