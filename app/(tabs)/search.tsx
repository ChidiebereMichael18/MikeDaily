import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import React, { useState, useContext } from 'react';
import Constants from 'expo-constants';
import { ThemeContext } from '../theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewsItem = {
  title: string;
  image: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
};

const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY || Constants.expoConfig?.extra?.gnewsApiKey;

const NewsCard = ({ item, colors }: { item: NewsItem; colors: any }) => (
  <TouchableOpacity
    style={[
      styles.newsCard,
      { backgroundColor: colors.card, shadowColor: colors.border }
    ]}
    onPress={() => {
      if (item.url) {
        Linking.openURL(item.url);
      }
    }}
    activeOpacity={0.8}
  >
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/300x200?text=No+Image' }}
      style={styles.newsImage}
    />
    <View style={styles.newsContent}>
      <Text style={[styles.newsCategory, { color: colors.secondary }]}>{item.source?.name || 'Unknown'}</Text>
      <Text style={[styles.newsTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.newsDate, { color: colors.secondary }]}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

export default function Search() {
  const { colors } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${GNEWS_API_KEY}&lang=en&max=20`
      );
      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
      } else {
        setError('No results found.');
        setNews([]);
      }
    } catch (err) {
      setError('Failed to fetch news');
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Search News</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }
          ]}
          placeholder="Type to search news..."
          placeholderTextColor={colors.secondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.primary }]} onPress={handleSearch}>
          <Text style={[styles.searchButtonText, { color: colors.background }]}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} color={colors.primary} />
      ) : error ? (
        <View style={styles.center}>
          <Text style={{ color: colors.text }}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {news.map((item, idx) => (
            <NewsCard key={item.url + idx} item={item} colors={colors} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  searchButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newsContent: {
    padding: 16,
  },
  newsCategory: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  newsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  newsDate: {
    color: '#666',
    fontSize: 13,
  },
  center: {
    alignItems: 'center',
    marginTop: 32,
  },
});
