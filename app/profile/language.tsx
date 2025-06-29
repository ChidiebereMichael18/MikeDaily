import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeProvider';

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
  const { colors } = useContext(ThemeContext);
  const [selected, setSelected] = useState<string>('en');

  const handleSelect = (code: string) => {
    setSelected(code);
    // Save to localStorage/AsyncStorage or global state for use in news screens
    // Example: AsyncStorage.setItem('newsLanguage', code)
    // For demo, just set state
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Select News Language</Text>
      <View style={styles.list}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              { backgroundColor: selected === lang.code ? colors.card : colors.input },
              selected === lang.code && styles.langButtonSelected,
            ]}
            onPress={() => handleSelect(lang.code)}
          >
            <Text
              style={[
                styles.langText,
                { color: selected === lang.code ? colors.primary : colors.text },
                selected === lang.code && styles.langTextSelected,
              ]}
            >
              {lang.label}
            </Text>
            {selected === lang.code && (
              <MaterialCommunityIcons name="check" size={22} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.info, { color: colors.secondary }]}>
        News will be shown in your selected language.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    // color: '#222',
  },
  list: {
    // gap: 12,
    marginBottom: 24,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    // backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  langButtonSelected: {
    // backgroundColor: '#e6f0ff',
  },
  langText: {
    fontSize: 16,
    // color: '#222',
  },
  langTextSelected: {
    // color: '#007AFF',
    fontWeight: 'bold',
  },
  info: {
    // color: '#666',
    fontSize: 14,
    marginTop: 12,
  },
});
