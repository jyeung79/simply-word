import { BookSelectionView } from "@/components/passageSelectionSheet/components/bookSelectionView";
import { ChapterSelectionView } from "@/components/passageSelectionSheet/components/chapterSelectionView";
import { PassageSelectionHeader } from "@/components/passageSelectionSheet/components/passageSelectionSheetHeader";
import { VerseSelectionView } from "@/components/passageSelectionSheet/components/verseSelection";
import { PASSAGE_SELECTION_SHEET } from "@/constants/sheetNames";
import {
  type SelectionStep,
  useVerseSelection,
} from "@/hooks/store/useVerseSelection";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef } from "react";
import { View } from "react-native";

const STEP_COMPONENTS: Record<SelectionStep, React.ComponentType> = {
  book: BookSelectionView,
  chapter: ChapterSelectionView,
  verse: VerseSelectionView,
};

const PassageSelectionSheet = () => {
  const sheetRef = useRef<TrueSheet>(null);

  const step = useVerseSelection((s) => s.step);
  const reset = useVerseSelection((s) => s.reset);

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <TrueSheet
      name={PASSAGE_SELECTION_SHEET}
      ref={sheetRef}
      detents={[0.9]}
      backgroundColor="#1a1a1a"
      cornerRadius={24}
      scrollable
      onDidDismiss={() => {
        reset();
      }}
    >
      <View className="flex-1 bg-gentle-dark">
        <PassageSelectionHeader />
        <StepComponent />
      </View>
    </TrueSheet>
  );
};

export { PassageSelectionSheet };
