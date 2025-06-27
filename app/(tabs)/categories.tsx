import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

interface Category {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const categories: Category[] = [
  { name: 'Top Stories', icon: 'star-circle' },
  { name: 'Technology', icon: 'laptop' },
  { name: 'Business', icon: 'chart-line' },
  { name: 'Sports', icon: 'basketball' },
  { name: 'Entertainment', icon: 'movie-open' },
  { name: 'Health', icon: 'hospital-box' },
  { name: 'Science', icon: 'flask' },
  { name: 'Politics', icon: 'gavel' },
];

export default function Categories() {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

  const handleCategoryPress = (category: string) => {
    // Navigate to /categories/[category] and pass category as param
    router.push({
      pathname: '/categories/[category]',
      params: { category: category.toLowerCase().replace(/\s+/g, '-') }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Categories</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[styles.categoryButton, { backgroundColor: colors.card }]}
              onPress={() => handleCategoryPress(category.name)}
            >
              <MaterialCommunityIcons name={category.icon} size={32} color={colors.primary} />
              <Text style={[styles.categoryText, { color: colors.text }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    // color: '#222',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    aspectRatio: 1,
    // backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    // color: '#222',
  },
});
