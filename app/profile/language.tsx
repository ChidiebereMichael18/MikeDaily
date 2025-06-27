import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Supported languages for GNews API
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
];

export default function LanguageScreen() {
  const router = useRouter();
  // Save selected language to localStorage or AsyncStorage in a real app
  const [selected, setSelected] = useState<string>('en');

  const handleSelect = (code: string) => {
    setSelected(code);
    // Save to localStorage/AsyncStorage or global state for use in news screens
    // Example: AsyncStorage.setItem('newsLanguage', code)
    // For demo, just set state
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.header}>Select News Language</Text>
      <View style={styles.list}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              selected === lang.code && styles.langButtonSelected,
            ]}
            onPress={() => handleSelect(lang.code)}
          >
            <Text
              style={[
                styles.langText,
                selected === lang.code && styles.langTextSelected,
              ]}
            >
              {lang.label}
            </Text>
            {selected === lang.code && (
              <MaterialCommunityIcons name="check" size={22} color="#007AFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.info}>
        News will be shown in your selected language.
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
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  langButtonSelected: {
    backgroundColor: '#e6f0ff',
  },
  langText: {
    fontSize: 16,
    color: '#222',
  },
  langTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
    fontSize: 14,
    marginTop: 12,
  },
});
