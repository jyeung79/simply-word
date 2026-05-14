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
        <View style={styles.heroSection}>
          <AnimatedIcon />
          <Text className="text-6xl font-serif text-sepia font-medium tracking-wide text-center">
            {"Simply\nWord"}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-sepia px-6 py-3 rounded-lg"
          onPress={() => router.navigate("/home/read")}
        >
          <Text className="text-xl font-serif text-sepia-text font-medium tracking-wide text-center">
            Get Started
          </Text>
        </TouchableOpacity>
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
