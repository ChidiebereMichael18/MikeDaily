import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signup attempted with:', email, password, confirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MikeDaily</Text>
      <Text style={styles.subtitle}>Create Account</Text>

      <View style={styles.inputContainer}>
         <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#000',
    fontWeight: 'bold',
  },
});
