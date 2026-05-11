import { PASSAGE_SELECTION_SHEET } from "@/constants/sheetNames";
import {
  SelectionStep,
  useVerseSelection,
} from "@/hooks/store/useVerseSelection";
import { Ionicons } from "@expo/vector-icons";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { Pressable, Text, View } from "react-native";

export const PassageSelectionHeader = () => {
  const { step, draftBook, draftChapter, goToStep } = useVerseSelection();

  const onBack = () => {
    if (step === SelectionStep.CHAPTER) goToStep(SelectionStep.BOOK);
    else if (step === SelectionStep.VERSE) goToStep(SelectionStep.CHAPTER);
  };

  const title =
    step === SelectionStep.BOOK
      ? "Your Bookshelf"
      : step === SelectionStep.CHAPTER
        ? (draftBook ?? "")
        : `${draftBook ?? ""} ${draftChapter ?? ""}`;

  const subtitle =
    step === SelectionStep.BOOK
      ? "66 BOOKS"
      : step === SelectionStep.CHAPTER
        ? "SELECT CHAPTER"
        : "SELECT VERSE";

  const showBack = step !== SelectionStep.BOOK;

  return (
    <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
      <View className="flex-1">
        {showBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            className="flex-row items-center mb-2"
          >
            <Ionicons name="chevron-back-outline" size={20} color="#e6e6e6" />
            <Text className="text-gentle-dark-text/80 text-sm ml-1 font-display">
              Back
            </Text>
          </Pressable>
        ) : null}
        <Text className="text-gentle-dark-text text-2xl font-display font-bold">
          {title}
        </Text>
        <Text className="text-gentle-dark-text/60 text-xs tracking-widest mt-1 font-display">
          {subtitle}
        </Text>
      </View>
      <Pressable
        onPress={() => TrueSheet.dismiss(PASSAGE_SELECTION_SHEET)}
        hitSlop={12}
        className="w-10 h-10 rounded-full bg-white/10 items-center justify-center ml-3"
      >
        <Ionicons name="close" size={20} color="#e6e6e6" />
      </Pressable>
    </View>
  );
};
