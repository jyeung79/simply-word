import { getVerseCount } from "@/constants/bibleStructure";
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

const VerseSelectionView = () => {
  const draftBook = useVerseSelection((s) => s.draftBook);
  const draftChapter = useVerseSelection((s) => s.draftChapter);
  const selectVerse = useVerseSelection((s) => s.selectVerse);

  if (!draftBook || draftChapter == null) return null;

  const count = getVerseCount(draftBook, draftChapter);
  const verses = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <ScrollView
      contentContainerClassName="px-4 pb-12"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row flex-wrap">
        {verses.map((n) => (
          <NumberTile key={n} value={n} onPress={selectVerse} />
        ))}
      </View>
    </ScrollView>
  );
};

export { VerseSelectionView };
