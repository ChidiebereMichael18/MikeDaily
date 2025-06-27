import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacyScreen() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.header}>Privacy Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Make my profile private</Text>
        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
          thumbColor={isPrivate ? '#007AFF' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#b3d4fc' }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Show my email to others</Text>
        <Switch
          value={showEmail}
          onValueChange={setShowEmail}
          thumbColor={showEmail ? '#007AFF' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#b3d4fc' }}
        />
      </View>
      <Text style={styles.info}>
        Adjust your privacy preferences. You can control who sees your profile and email.
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
    color: '#666',
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
