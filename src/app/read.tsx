import PassageSelectionSheet from "@/components/passageSelectionSheet";
import ESV_BIBLE from "@/constants/translations/esv_bible.json";
import { useBottomSheet } from "@/hooks/store/useBottomSheet";
import { useCurrentPassage } from "@/hooks/store/useCurrentPassage";
import { useTabbar } from "@/hooks/store/useTabbar";
import { BibleBookNames } from "@/types/bible";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BookOfBible {
  [chaperId: string]: {
    [verseNumber: string]: string;
  };
}

interface PassageContentItem {
  verseNumber: string;
  verse: string;
}

export default function ReadScreen() {
  const {
    passage: { book, chapter, verse },
  } = useCurrentPassage();
  const bookOfBible: Record<BibleBookNames, BookOfBible> = ESV_BIBLE;

  const passageContent: PassageContentItem[] = useMemo(
    () =>
      Object.entries(bookOfBible[book][chapter.toString()]).map(
        ([verseNumber, verse]) => ({ verseNumber, verse }),
      ),
    [book, chapter],
  );

  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const { setMinimized } = useTabbar();
  const { expanded, expandSheet, collapseSheet } = useBottomSheet();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setMinimized(true);
      return () => setMinimized(false);
    }, []),
  );

  const isHidden = useSharedValue(false);
  const lastOffsetY = useSharedValue(0);

  const tapGesture = Gesture.Tap()
    .maxDuration(150)
    .onEnd((event) => {
      const tapY = event.absoluteY;
      const topThreshold = screenHeight * 0.2;
      const bottomThreshold = screenHeight * 0.8;

      if (tapY > topThreshold && tapY < bottomThreshold) {
        isHidden.value = !isHidden.value;
      }
    });

  const headerAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(isHidden.value ? -80 : 0, { duration: 220 }) },
    ],
    opacity: withTiming(isHidden.value ? 0 : 1, { duration: 220 }),
  }));

  const footerAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(isHidden.value ? 80 : 0, { duration: 220 }) },
    ],
    opacity: withTiming(isHidden.value ? 0 : 1, { duration: 220 }),
  }));

  const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    const y = event.contentOffset.y;
    const diff = y - lastOffsetY.value;
    const isScrollingDown = diff > 0;
    const isScrollingUp = diff < 0;

    if (isScrollingDown && diff > 5 && !isHidden.value) isHidden.value = true;
    if (isScrollingUp && diff < -12 && isHidden.value) isHidden.value = false;
    lastOffsetY.value = y;
  });

  return (
    <View className="flex-1 bg-sepia">
      {/* Top Bar */}
      <Animated.View
        className="flex-row items-end justify-between px-6 pb-4 absolute top-0 z-50 bg-gentle-dark/80 backdrop-blur-md w-full min-h-28"
        style={headerAnimStyle}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-semibold text-lg tracking-wide font-display">
          {"Genesis 1"}
        </Text>
        <View style={{ width: 28 }} />
      </Animated.View>

      {/* Will monitor if tapGesture affects scrolling gestures - update: it does not at the moment 
      Will monitor as user interacts with app more
      */}
      <GestureDetector gesture={tapGesture}>
        <AnimatedFlashList
          data={passageContent}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-3 pb-12"
          contentContainerStyle={{ paddingTop: insets.top + 24 }}
          ListHeaderComponent={() => (
            <View className="py-4 items-center">
              <Text className="text-sepia-text text-4xl font-bold tracking-wide font-display">
                {book} {chapter}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-row my-4 pr-6 pl-2 font-serif">
              <Text className="text-xs text-sepia-verse-number/70 mr-1 mt-1">
                {item.verseNumber}
              </Text>
              <Text className="text-sepia-text text-lg leading-relaxed">
                {item.verse}
              </Text>
            </View>
          )}
        />
      </GestureDetector>

      {/* Top fade — focuses reading on the middle of the screen */}
      <LinearGradient
        pointerEvents="none"
        colors={["#F8F4E8", "rgba(248, 244, 232, 0)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: screenHeight * 0.3,
        }}
      />

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(248, 244, 232, 0)", "#F8F4E8"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: screenHeight * 0.2,
        }}
      />

      {/* HIDE for now - Bottom Player */}
      <Animated.View
        className="absolute bottom-0 px-6 pb-8 pt-4 font-serif bg-gentle-dark/80 text-white backdrop-blur-md rounded-3xl w-full"
        style={footerAnimStyle}
      >
        {/* Progress Row */}
        <View className="flex-row items-center mb-8">
          {/* Play Button */}
          <TouchableOpacity className="w-12 h-12 bg-[#f0f3f4] rounded-full justify-center items-center shadow-sm mr-4">
            <Ionicons
              name="play"
              size={26}
              color="#0d313d"
              style={{ marginLeft: 4 }}
            />
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
            <Ionicons name="list-outline" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              expandSheet();
            }}
          >
            <Text className="text-white font-semibold text-base font-display">
              Open Verse Selector
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-white flex-row items-center px-4 py-2.5 rounded-full">
            <Text className="text-white font-semibold text-base font-display">
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <PassageSelectionSheet />
    </View>
  );
}
