import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const SettingItem = ({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <MaterialCommunityIcons name={icon as any} size={24} color="#333" />
    <Text style={styles.settingText}>{title}</Text>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://picsum.photos/200' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <SettingItem
            icon="account-edit"
            title="Edit Profile"
            onPress={() => router.push('/profile/edit')}
          />
          <SettingItem
            icon="bell-outline"
            title="Notifications"
            onPress={() => router.push('/profile/notifications')}
          />
          <SettingItem
            icon="shield-lock-outline"
            title="Privacy"
            // onPress={() => router.push('/profile/privacy')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem
            icon="theme-light-dark"
            title="Dark Mode"
            // onPress={() => router.push('/profile/darkmode')}
          />
          <SettingItem
            icon="translate"
            title="Language"
            // onPress={() => router.push('/profile/language')}
          />
        </View>

        <Link href='/(auth)/login' asChild>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </Link>
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
