import { useBottomSheet } from "@/hooks/store/useBottomSheet";
import { useCurrentPassage } from "@/hooks/store/useCurrentPassage";
import type { BibleBookNames } from "@/types/bible";
import { create } from "zustand";

export type SelectionStep = "book" | "chapter" | "verse";

interface VerseSelectionStore {
  step: SelectionStep;
  draftBook: BibleBookNames | null;
  draftChapter: number | null;
  draftVerse: number | null;

  selectBook: (book: BibleBookNames) => void;
  selectChapter: (chapter: number) => void;
  selectVerse: (verse: number) => void;
  goToStep: (step: SelectionStep) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  step: "book" as const,
  draftBook: null,
  draftChapter: null,
  draftVerse: null,
};

export const useVerseSelection = create<VerseSelectionStore>((set, get) => ({
  ...INITIAL_STATE,

  selectBook: (book) =>
    set({
      draftBook: book,
      draftChapter: null,
      draftVerse: null,
      step: "chapter",
    }),

  selectChapter: (chapter) =>
    set({ draftChapter: chapter, draftVerse: null, step: "verse" }),

  selectVerse: (verse) => {
    const { draftBook, draftChapter } = get();
    if (draftBook == null || draftChapter == null) return;
    set({ draftVerse: verse });
    useCurrentPassage.getState().setPassage({
      book: draftBook,
      chapter: draftChapter,
      verse,
    });
    useBottomSheet.getState().collapseSheet();
  },

  goToStep: (step) => set({ step }),

  reset: () => set(INITIAL_STATE),
}));
