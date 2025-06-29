import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EditProfile() {
  const { colors } = useContext(ThemeContext);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('');
  const router = useRouter();

  const handleSave = () => {
    // You can add validation and API call here
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Edit Profile</Text>
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
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
        <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }
          ]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          placeholderTextColor={colors.secondary}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, { color: colors.background }]}>Save</Text>
        </TouchableOpacity>
      </View>
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
