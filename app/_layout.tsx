import { StatusBar } from "expo-status-bar";
import { Stack } from 'expo-router';
import { ThemeProvider, ThemeContext } from './theme/ThemeProvider';
import { useContext } from 'react';
import { Appearance, useColorScheme } from 'react-native';

function AppLayout() {
  const { theme } = useContext(ThemeContext);
  const systemScheme = useColorScheme();
  const colorScheme = theme === 'system' ? systemScheme : theme;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: "MikeDaily" }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}