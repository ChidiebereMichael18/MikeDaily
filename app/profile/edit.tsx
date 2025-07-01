import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile() {
  const { colors } = useContext(ThemeContext);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const router = useRouter();

  // Fetch user info from AsyncStorage on mount
  React.useEffect(() => {
    const fetchUser = async () => {
      const storedName = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    // ...existing validation for name/email if needed...

    if (!oldPassword || !newPassword) {
      Alert.alert('Error', 'Please enter both old and new password.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User not found.');
        return;
      }
      const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
      const endpoint = `${backendUrl}/api/users/${userId}`;

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email: email,
          oldPassword,
          password: newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem('username', name);
        await AsyncStorage.setItem('email', email);
        setOldPassword('');
        setNewPassword('');
        setSuccessModalVisible(true);
        setTimeout(() => {
          setSuccessModalVisible(false);
          router.replace('/profile');
        }, 1500);
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photos to change your profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Edit Profile</Text>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar || 'https://picsum.photos/200' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: colors.primary }]} onPress={pickImage}>
          <MaterialCommunityIcons name="camera" size={20} color={colors.background} />
          <Text style={[styles.editAvatarText, { color: colors.background }]}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Username</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={colors.secondary}
        />
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Your email"
          placeholderTextColor={colors.secondary}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={[styles.label, { color: colors.text }]}>Old Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Old password"
          placeholderTextColor={colors.secondary}
          secureTextEntry
        />
        <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
          placeholderTextColor={colors.secondary}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, { color: colors.background }]}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 30,
            borderRadius: 12,
            alignItems: 'center',
            elevation: 5,
          }}>
            <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>
              Profile updated successfully!
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 24,
  },
  backButton: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    // color: '#222',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  editAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  editAvatarText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  form: {
    // gap: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    // color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    // backgroundColor: '#fafafa',
    // color: '#222',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    // backgroundColor: '#007AFF',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#fff',
  },
});
