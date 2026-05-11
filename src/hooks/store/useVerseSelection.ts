import { PASSAGE_SELECTION_SHEET } from "@/constants/sheetNames";
import { useCurrentPassage } from "@/hooks/store/useCurrentPassage";
import type { BibleBookNames } from "@/types/bible";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { create } from "zustand";

export enum SelectionStep {
  BOOK = "book",
  CHAPTER = "chapter",
  VERSE = "verse",
}

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
  step: SelectionStep.BOOK,
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
      step: SelectionStep.CHAPTER,
    }),

  selectChapter: (chapter) =>
    set({
      draftChapter: chapter,
      draftVerse: null,
      step: SelectionStep.VERSE,
    }),

  selectVerse: (verse) => {
    const { draftBook, draftChapter } = get();
    if (draftBook == null || draftChapter == null) return;
    set({ draftVerse: verse });
    useCurrentPassage.getState().setPassage({
      book: draftBook,
      chapter: draftChapter,
      verse,
    });
    TrueSheet.dismiss(PASSAGE_SELECTION_SHEET);
  },

  goToStep: (step) => set({ step }),

  reset: () => set(INITIAL_STATE),
}));
