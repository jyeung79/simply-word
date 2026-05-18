import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { AuroraBackground } from "@/components/aurora-background";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
// import { useAuth } from "@/hooks/store/useAuth";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  // const { user, isLoaded } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AuroraBackground />
      <SafeAreaView style={styles.safeArea}>
        <View className="flex justify-center items-center grow-4">
          <AnimatedIcon />
          <Text className="text-6xl font-serif text-off-white font-medium tracking-wide text-center">
            {"Simply\nWord"}
          </Text>
        </View>
        <View className="flex justify-center items-center grow-1">
          <Text className="text-lg font-serif italic text-off-white/70 font-medium tracking-wide text-center max-w-72">
            {
              "Reading the bible shouldn't be hard. Let's get focused on the word of God."
            }
          </Text>
        </View>

        <View className="flex justify-center items-center grow-1">
          <TouchableOpacity
            className="bg-sepia px-6 py-3 rounded-lg"
            onPress={() => router.replace("/home")}
          >
            <Text className="text-xl font-serif text-sepia-text font-medium tracking-wide text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
