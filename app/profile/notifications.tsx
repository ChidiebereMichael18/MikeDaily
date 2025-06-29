import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Switch, Alert, AppState, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeProvider';

const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY || Constants.expoConfig?.extra?.gnewsApiKey;

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState(false);
  const lastStoryId = useRef<string | null>(null);
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    if (!enabled) return;
    // Listen for app foreground/background to check for new stories
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkForNewStories();
      }
    });
    // Initial check
    checkForNewStories();
    return () => subscription.remove();
  }, [enabled]);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Enable notifications in settings.');
      return false;
    }
    return true;
  };

  const checkForNewStories = async () => {
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&max=1`
      );
      const data = await res.json();
      const latest = data.articles?.[0];
      if (latest && lastStoryId.current && latest.title !== lastStoryId.current) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'New Story!',
            body: latest.title,
          },
          trigger: null,
        });
      }
      if (latest) lastStoryId.current = latest.title;
    } catch {}
  };

  const toggleSwitch = async () => {
    if (!enabled) {
      const granted = await requestPermission();
      if (granted) {
        setEnabled(true);
        Alert.alert('Notifications Enabled', 'You will receive notifications for new stories.');
      }
    } else {
      setEnabled(false);
      Alert.alert('Notifications Disabled', 'You will not receive notifications.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Push Notifications</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Enable notifications for new stories</Text>
        <Switch
          value={enabled}
          onValueChange={toggleSwitch}
          thumbColor={enabled ? colors.primary : colors.border}
          trackColor={{ false: colors.border, true: '#b3d4fc' }}
        />
      </View>
      <Text style={[styles.info, { color: colors.secondary }]}>
        You will receive a local notification when a new story is published (while the app is open or in background).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  info: {
    fontSize: 14,
    marginTop: 12,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
});
