import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../theme/ThemeProvider';

type ThemeType = 'light' | 'dark' | 'system';

const MODES: { key: ThemeType; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
  { key: 'light', label: 'Light Mode', icon: 'white-balance-sunny' },
  { key: 'dark', label: 'Dark Mode', icon: 'weather-night' },
  { key: 'system', label: 'System Default', icon: 'cellphone-cog' },
];

export default function DarkModeScreen() {
  const router = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);
  const [selected, setSelected] = useState<ThemeType>(theme);

  useEffect(() => {
    setSelected(theme);
  }, [theme]);

  const handleSelect = async (mode: ThemeType) => {
    setSelected(mode);
    setTheme(mode);
    await AsyncStorage.setItem('theme', mode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.header}>Theme</Text>
      <View style={styles.list}>
        {MODES.map((mode) => (
          <TouchableOpacity
            key={mode.key}
            style={[
              styles.modeButton,
              selected === mode.key && styles.modeButtonSelected,
            ]}
            onPress={() => handleSelect(mode.key)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <MaterialCommunityIcons name={mode.icon} size={22} color="#007AFF" />
              <Text
                style={[
                  styles.modeText,
                  selected === mode.key && styles.modeTextSelected,
                ]}
              >
                {mode.label}
              </Text>
            </View>
            {selected === mode.key && (
              <MaterialCommunityIcons name="check" size={22} color="#007AFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.info}>
        Choose your preferred theme for the app.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  modeButtonSelected: {
    backgroundColor: '#e6f0ff',
  },
  modeText: {
    fontSize: 16,
    color: '#222',
  },
  modeTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
    fontSize: 14,
    marginTop: 12,
  },
});
