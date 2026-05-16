import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type CardProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  dashed?: boolean;
  onPress?: () => void;
};

const Card = ({ icon, title, subtitle, dashed, onPress }: CardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-row items-center gap-4 rounded-2xl px-5 py-5 border ${
        dashed
          ? "border-dashed border-gentle-dark-text/40 bg-gentle-dark-text/[0.03]"
          : "border-gentle-dark-text/10 bg-gentle-dark-text/[0.06]"
      }`}
    >
      <View className="h-12 w-12 items-center justify-center rounded-full bg-gentle-dark-text/10">
        <Ionicons name={icon} size={22} color="#e6e6e6" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gentle-dark-text">
          {title}
        </Text>
        <Text className="mt-1 text-sm text-gentle-dark-text/60">
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#e6e6e6" />
    </TouchableOpacity>
  );
};

export { Card };
