import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';

type NewsItem = {
  title: string;
  image: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
};

const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY || Constants.expoConfig?.extra?.gnewsApiKey;

const NewsCard = ({ item }: { item: NewsItem }) => (
  <TouchableOpacity
    style={styles.newsCard}
    onPress={() => {
      if (item.url) {
        // You can use Linking.openURL(item.url) if you want
      }
    }}
    activeOpacity={0.8}
  >
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/300x200?text=No+Image' }}
      style={styles.newsImage}
    />
    <View style={styles.newsContent}>
      <Text style={styles.newsCategory}>{item.source?.name || 'Unknown'}</Text>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDate}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

export default function Search() {
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
    <View style={styles.container}>
      <Text style={styles.header}>Search News</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type to search news..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {news.map((item, idx) => (
            <NewsCard key={item.url + idx} item={item} />
          ))}
        </ScrollView>
      )}
    </View>
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
