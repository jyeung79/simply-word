import { useBottomSheet } from "@/hooks/store/useBottomSheet";
import { useVerseSelection } from "@/hooks/store/useVerseSelection";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export const PassageSelectionHeader = () => {
  const { step, draftBook, draftChapter, goToStep } = useVerseSelection();
  const { collapseSheet } = useBottomSheet();

  const onBack = () => {
    if (step === "chapter") goToStep("book");
    else if (step === "verse") goToStep("chapter");
  };

  const title =
    step === "book"
      ? "Your Bookshelf"
      : step === "chapter"
        ? (draftBook ?? "")
        : `${draftBook ?? ""} ${draftChapter ?? ""}`;

  const subtitle =
    step === "book"
      ? "66 BOOKS"
      : step === "chapter"
        ? "SELECT CHAPTER"
        : "SELECT VERSE";

  const showBack = step !== "book";

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
        onPress={collapseSheet}
        hitSlop={12}
        className="w-10 h-10 rounded-full bg-white/10 items-center justify-center ml-3"
      >
        <Ionicons name="close" size={20} color="#e6e6e6" />
      </Pressable>
    </View>
  );
};
