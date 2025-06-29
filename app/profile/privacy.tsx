import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeProvider';

export default function PrivacyScreen() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Privacy Settings</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Make my profile private</Text>
        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
          thumbColor={isPrivate ? colors.primary : colors.border}
          trackColor={{ false: colors.border, true: '#b3d4fc' }}
        />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Show my email to others</Text>
        <Switch
          value={showEmail}
          onValueChange={setShowEmail}
          thumbColor={showEmail ? colors.primary : colors.border}
          trackColor={{ false: colors.border, true: '#b3d4fc' }}
        />
      </View>
      <Text style={[styles.info, { color: colors.secondary }]}>
        Adjust your privacy preferences. You can control who sees your profile and email.
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
