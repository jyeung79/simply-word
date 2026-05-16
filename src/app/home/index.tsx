import { Card } from "@/components/ui/card";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gentle-dark">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <ScrollView
          contentContainerClassName="px-6 pt-6 pb-10 gap-8"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-base text-gentle-dark-text/60">
              Good morning
            </Text>
            <Text className="mt-2 text-4xl font-bold text-gentle-dark-text">
              Ready to focus?
            </Text>
          </View>

          <View className="gap-3">
            <Text className="text-sm text-gentle-dark-text/60">
              Continue Reading
            </Text>
            <Card
              dashed
              icon="book-outline"
              title="Psalm 23"
              subtitle="Verse 4 • Standard Focus"
            />
          </View>

          <View className="gap-4">
            <Card
              icon="compass-outline"
              title="Start a Journey"
              subtitle="Explore curated reading paths"
            />
            <Card
              icon="folder-outline"
              title="Your Collections"
              subtitle="4 collections • 41 verses"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
