import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
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

const NewsCard = ({ item, featured }: { item: NewsItem; featured?: boolean }) => (
  <TouchableOpacity
    style={[
      styles.newsCard,
      featured ? styles.featuredCard : styles.latestCard
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
      style={[
        styles.newsImage,
        featured ? styles.featuredImage : styles.latestImage
      ]}
    />
    <View style={styles.newsContent}>
      <Text style={styles.newsCategory}>{item.source?.name || 'Unknown'}</Text>
      <Text style={[
        styles.newsTitle,
        featured ? styles.featuredTitle : styles.latestTitle
      ]}>{item.title}</Text>
      <Text style={styles.newsDate}>{new Date(item.publishedAt).toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&max=10`);
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
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Day</Text>
          <Text style={styles.subtitle}>Catch up with the latest news</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {news.slice(0, 3).map((item, idx) => (
              <NewsCard key={item.url + idx} item={item} featured />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <View style={styles.latestContainer}>
            {news.map((item, idx) => (
              <NewsCard key={item.url + idx} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featuredContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  latestContainer: {
    paddingHorizontal: 16,
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
  featuredCard: {
    width: 280,
    marginRight: 16,
  },
  latestCard: {
    width: '100%',
  },
  newsImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  latestImage: {
    width: '100%',
    height: 200,
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
  },
  featuredTitle: {
    fontSize: 16,
  },
  latestTitle: {
    fontSize: 18,
  },
  newsDate: {
    color: '#666',
    fontSize: 13,
  },
});

