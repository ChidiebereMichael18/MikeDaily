import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  useEffect(() => {
    // Navigate to login after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>MikeDaily</Text>
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>STAY informed,STAY updated</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 5,
    fontFamily:'Roboto',
  },
});
