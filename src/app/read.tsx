import { MaxContentWidth } from "@/constants/theme";
import ESV_BIBLE from "@/constants/translations/esv_bible.json";
import { useTabbar } from "@/hooks/store/useTabbar";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';

type BibleBookNames = "Genesis" | "Exodus" | "Leviticus" | "Numbers" | "Deuteronomy" | "Joshua" | "Judges" | "Ruth" | "1 Samuel" | "2 Samuel" | "1 Kings" | "2 Kings" | "1 Chronicles" | "2 Chronicles" | "Ezra" | "Nehemiah" | "Esther" | "Job" | "Psalms" | "Proverbs" | "Ecclesiastes" | "Song of Solomon" | "Isaiah" | "Jeremiah" | "Lamentations" | "Ezekiel" | "Daniel" | "Hosea" | "Joel" | "Amos" | "Obadiah" | "Jonah" | "Micah" | "Nahum" | "Habakkuk" | "Zephaniah" | "Haggai" | "Zechariah" | "Malachi" | "Matthew" | "Mark" | "Luke" | "John" | "Acts" | "Romans" | "1 Corinthians" | "2 Corinthians" | "Galatians" | "Ephesians" | "Philippians" | "Colossians" | "1 Thessalonians" | "2 Thessalonians" | "1 Timothy" | "2 Timothy" | "Titus" | "Philemon" | "Hebrews" | "James" | "1 Peter" | "2 Peter" | "1 John" | "2 John" | "3 John" | "Jude" | "Revelation";

interface BookOfBible {
    [chaperId: string]: {
        [verseNumber: string]: string
    }
}

export default function ReadScreen() {
    const bookOfBible: Record<BibleBookNames, BookOfBible> = ESV_BIBLE;
    const genesis = Object.entries(bookOfBible["Genesis"]).map(([chapter, verses]) => ({ chapter, verses }));
    const lastOffsetY = useRef(0);
    console.log(genesis)

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        const diff = y - lastOffsetY.current;
        // basic “scrolling down more than 10px” heuristic
        if (diff > 10 && y > 0) useTabbar.getState().setIsMinized(true);
        if (diff < -10 || y <= 0) useTabbar.getState().setIsMinized(false);
        lastOffsetY.current = y;
    };

    return (
        <View className={`flex-1 bg-sepia text-sepia-text w-[${MaxContentWidth}px]`}>
            <Text className="text-center text-4xl font-semibold leading-13">
                Genesis
            </Text>
            <FlashList
                data={genesis}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerClassName="px-4"
                renderItem={({ item, index }) =>
                    < View key={`chapter-${item.chapter}`} className="grow-1">
                        <Text className="flex-1 text-center text-2xl font-semibold leading-13">{`Chapter ${item.chapter}`}</Text>
                        {Object.entries(item.verses).map(([verseNumber, verse]) => <Text key={`${item.chapter}-${verseNumber}`} className="grow-1">{`\n${verseNumber}: ${verse}`}</Text>)}
                    </View>
                }
            />
        </View>
    );
}