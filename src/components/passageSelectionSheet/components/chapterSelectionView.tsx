import { getChapterCount } from "@/constants/bibleStructure";
import { useVerseSelection } from "@/hooks/store/useVerseSelection";
import { Pressable, ScrollView, Text, View } from "react-native";

const NumberTile = ({
  value,
  onPress,
}: {
  value: number;
  onPress: (value: number) => void;
}) => (
  <Pressable onPress={() => onPress(value)} className="w-1/5 p-1.5">
    {({ pressed }) => (
      <View
        className={`aspect-square rounded-lg bg-white/5 border border-white/10 items-center justify-center ${
          pressed ? "opacity-60" : ""
        }`}
      >
        <Text className="text-gentle-dark-text text-lg font-display">
          {value}
        </Text>
      </View>
    )}
  </Pressable>
);

export const ChapterSelectionView = () => {
  const draftBook = useVerseSelection((s) => s.draftBook);
  const selectChapter = useVerseSelection((s) => s.selectChapter);

  if (!draftBook) return null;

  const count = getChapterCount(draftBook);
  const chapters = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <ScrollView
      contentContainerClassName="px-4 pb-12"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row flex-wrap">
        {chapters.map((n) => (
          <NumberTile key={n} value={n} onPress={selectChapter} />
        ))}
      </View>
    </ScrollView>
  );
};
