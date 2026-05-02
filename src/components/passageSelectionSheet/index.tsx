import { BookSelectionView } from "@/components/passageSelectionSheet/components/bookSelectionView";
import { ChapterSelectionView } from "@/components/passageSelectionSheet/components/chapterSelectionView";
import { PassageSelectionHeader } from "@/components/passageSelectionSheet/components/passageSelectionSheetHeader";
import { VerseSelectionView } from "@/components/passageSelectionSheet/components/verseSelection";
import { useBottomSheet } from "@/hooks/store/useBottomSheet";
import {
  type SelectionStep,
  useVerseSelection,
} from "@/hooks/store/useVerseSelection";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useEffect, useRef } from "react";
import { View } from "react-native";

const STEP_COMPONENTS: Record<SelectionStep, React.ComponentType> = {
  book: BookSelectionView,
  chapter: ChapterSelectionView,
  verse: VerseSelectionView,
};

const PassageSelectionSheet = () => {
  const sheetRef = useRef<TrueSheet>(null);

  const { expanded, collapseSheet } = useBottomSheet();

  const step = useVerseSelection((s) => s.step);
  const reset = useVerseSelection((s) => s.reset);

  const StepComponent = STEP_COMPONENTS[step];

  useEffect(() => {
    if (expanded)
      sheetRef.current?.present(); // What happens if the sheets already present? Note: I think it should not be reopen anyways
    else sheetRef.current?.dismiss();
  }, [expanded]);

  return (
    <TrueSheet
      ref={sheetRef}
      detents={[0.9]}
      backgroundColor="#1a1a1a"
      cornerRadius={24}
      scrollable
      onDidDismiss={() => {
        reset();
        collapseSheet();
      }}
    >
      <View className="flex-1 bg-gentle-dark">
        <PassageSelectionHeader />
        <StepComponent />
      </View>
    </TrueSheet>
  );
};

export default PassageSelectionSheet;
