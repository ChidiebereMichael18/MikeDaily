import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ThemeContext } from '../theme/ThemeProvider';

const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY || Constants.expoConfig?.extra?.gnewsApiKey;

type NewsItem = {
  title: string;
  image: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
};

const NewsCard = ({ item, colors }: { item: NewsItem; colors: any }) => (
  <TouchableOpacity
    style={[
      styles.newsCard,
      { backgroundColor: colors.card, shadowColor: colors.border }
    ]}
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
      <Text style={[styles.newsCategory, { color: colors.secondary }]}>{item.source?.name || 'Unknown'}</Text>
      <Text style={[styles.newsTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.newsDate, { color: colors.secondary }]}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

const categoryMap: Record<string, string> = {
  'top-stories': 'general',
  technology: 'technology',
  business: 'business',
  sports: 'sports',
  entertainment: 'entertainment',
  health: 'health',
  science: 'science',
  politics: 'world', // GNews does not have 'politics', use 'world' as closest
};

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const { colors } = useContext(ThemeContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const gnewsCategory = categoryMap[category ?? ''] || 'general';
        const res = await fetch(
          `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&topic=${gnewsCategory}&max=10`
        );
        const data = await res.json();
        if (data.articles) {
          setNews(data.articles);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>
        {category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} News
      </Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} color={colors.primary} />
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    // backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textTransform: 'capitalize',
    // color: '#222',
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
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
});
