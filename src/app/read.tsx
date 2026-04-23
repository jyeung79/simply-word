import ESV_BIBLE from "@/constants/translations/esv_bible.json";
import { useTabbar } from "@/hooks/store/useTabbar";
import { Feather, Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BibleBookNames = "Genesis" | "Exodus" | "Leviticus" | "Numbers" | "Deuteronomy" | "Joshua" | "Judges" | "Ruth" | "1 Samuel" | "2 Samuel" | "1 Kings" | "2 Kings" | "1 Chronicles" | "2 Chronicles" | "Ezra" | "Nehemiah" | "Esther" | "Job" | "Psalms" | "Proverbs" | "Ecclesiastes" | "Song of Solomon" | "Isaiah" | "Jeremiah" | "Lamentations" | "Ezekiel" | "Daniel" | "Hosea" | "Joel" | "Amos" | "Obadiah" | "Jonah" | "Micah" | "Nahum" | "Habakkuk" | "Zephaniah" | "Haggai" | "Zechariah" | "Malachi" | "Matthew" | "Mark" | "Luke" | "John" | "Acts" | "Romans" | "1 Corinthians" | "2 Corinthians" | "Galatians" | "Ephesians" | "Philippians" | "Colossians" | "1 Thessalonians" | "2 Thessalonians" | "1 Timothy" | "2 Timothy" | "Titus" | "Philemon" | "Hebrews" | "James" | "1 Peter" | "2 Peter" | "1 John" | "2 John" | "3 John" | "Jude" | "Revelation";

interface BookOfBible {
    [chaperId: string]: {
        [verseNumber: string]: string
    }
}

export default function ReadScreen() {
    const bookOfBible: Record<BibleBookNames, BookOfBible> = ESV_BIBLE;
    // Just grab chapter 1 verses to display a continuous text
    const chapter1 = Object.entries(bookOfBible["Genesis"]["1"]).map(([verseNumber, verse]) => ({ verseNumber, verse }));

    const lastOffsetY = useRef(0);
    const insets = useSafeAreaInsets();

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        const diff = y - lastOffsetY.current;
        if (diff > 10 && y > 0) useTabbar.getState().setIsMinized(true);
        if (diff < -10 || y <= 0) useTabbar.getState().setIsMinized(false);
        lastOffsetY.current = y;
    };

    return (
        <View className="flex-1 bg-sepia">
            {/* Top Bar */}
            <View className="flex-row items-center justify-between px-6" style={{ paddingTop: insets.top || 48 }}>
                <TouchableOpacity>
                    <Feather name="x" size={28} color="white" />
                </TouchableOpacity>
                <Text className="text-sepia-text font-semibold text-lg tracking-wide font-display">{"Genesis 1"}</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Scrollable Content */}
            <FlashList
                data={chapter1}
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-3 pb-12"
                renderItem={({ item }) => (
                    <View className="flex-row my-4 pr-6 pl-2 font-serif">
                        <Text className="text-xs text-sepia-verse-number/70 mr-1 mt-1">{item.verseNumber}</Text>
                        <Text className="text-sepia-text text-lg leading-relaxed">
                            {item.verse}
                        </Text>
                    </View>
                )}
            />

            {/* HIDE for now - Bottom Player */}
            <View className="px-6 pb-8 pt-4 hidden font-serif" style={{ paddingBottom: insets.bottom || 32 }}>

                {/* Progress Row */}
                <View className="flex-row items-center mb-8">
                    {/* Play Button */}
                    <TouchableOpacity className="w-14 h-14 bg-[#f0f3f4] rounded-full justify-center items-center shadow-sm mr-4">
                        <Ionicons name="play" size={26} color="#0d313d" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>

                    {/* Progress Bar & Time */}
                    <View className="flex-1">
                        <View className="h-1 bg-white/30 rounded-full flex-row items-center w-full mb-2 relative">
                            <View className="h-full w-0 bg-white rounded-full">
                                <View className="w-3.5 h-3.5 bg-white rounded-full absolute -right-1.5 top-1/2 -mt-[7px]" />
                            </View>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-white font-medium text-sm">00:00</Text>
                            <Text className="text-white font-medium text-sm">-05:28</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Controls Row*/}
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity>
                        <Feather name="align-left" size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text className="text-white font-semibold text-base font-display">Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="border border-white flex-row items-center px-4 py-2.5 rounded-full">
                        <Feather name="send" size={16} color="white" className="mr-2" style={{ transform: [{ rotate: '45deg' }] }} />
                        <Text className="text-white font-semibold text-base font-display">Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}