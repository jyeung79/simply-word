import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import '../global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
