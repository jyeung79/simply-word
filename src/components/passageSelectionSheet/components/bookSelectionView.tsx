import {
  getBooksGroupedByCategory,
  getChapterCount,
} from "@/constants/bibleStructure";
import { useVerseSelection } from "@/hooks/store/useVerseSelection";
import type { BibleBookNames, BookMeta, Testament } from "@/types/bible";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const BookCard = ({
  book,
  onPress,
}: {
  book: BookMeta;
  onPress: (name: BibleBookNames) => void;
}) => (
  <Pressable onPress={() => onPress(book.name)} className="w-1/3 px-1.5 py-1.5">
    {({ pressed }) => (
      <View
        className={`aspect-[3/4] rounded-lg bg-white/5 border border-white/10 items-center justify-center px-2 ${
          pressed ? "opacity-60" : ""
        }`}
      >
        <Text
          className="text-gentle-dark-text text-base font-display text-center"
          numberOfLines={2}
        >
          {book.name}
        </Text>
        <Text className="text-gentle-dark-text/50 text-[10px] mt-1 tracking-wider">
          {getChapterCount(book.name)} CH
        </Text>
      </View>
    )}
  </Pressable>
);

const TestamentTab = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className={`px-5 py-2 rounded-full mr-2 ${
      active ? "bg-white" : "bg-transparent border border-white/20"
    }`}
  >
    <Text
      className={`font-display text-sm ${
        active ? "text-gentle-dark" : "text-gentle-dark-text"
      }`}
    >
      {label}
    </Text>
  </Pressable>
);

export const BookSelectionView = () => {
  const [testament, setTestament] = useState<Testament>("old");
  const selectBook = useVerseSelection((s) => s.selectBook);
  const groups = getBooksGroupedByCategory(testament);

  return (
    <View className="flex-1">
      <View className="flex-row px-6 pb-4">
        <TestamentTab
          label="Old Testament"
          active={testament === "old"}
          onPress={() => setTestament("old")}
        />
        <TestamentTab
          label="New Testament"
          active={testament === "new"}
          onPress={() => setTestament("new")}
        />
      </View>
      <ScrollView
        contentContainerClassName="px-4 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {groups.map(({ category, books }) =>
          books.length === 0 ? null : (
            <View key={category} className="mb-6">
              <Text className="text-gentle-dark-text/50 text-xs tracking-widest mb-2 px-2 font-display">
                {category.toUpperCase()}
              </Text>
              <View className="flex-row flex-wrap">
                {books.map((book) => (
                  <BookCard key={book.name} book={book} onPress={selectBook} />
                ))}
              </View>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  );
};
