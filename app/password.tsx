import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSavePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Fout', 'Wachtwoorden komen niet overeen.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.105:5000/register-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        Alert.alert('Succes', 'Wachtwoord succesvol opgeslagen!', [
          { text: 'OK', onPress: () => router.push('/startscherm') }, // Navigeer naar het startscherm
        ]);
      } else {
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het opslaan van het wachtwoord.');
      }
    } catch (error) {
      console.error('Fout bij het opslaan van het wachtwoord:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wachtwoord kiezen.</Text>

      <TextInput
        style={styles.input}
        placeholder="Geef je wachtwoord in"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Bevestig je wachtwoord"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
        <Text style={styles.saveButtonText}>Volgende</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Al een account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333333' },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  saveButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  loginText: { textAlign: 'center', color: '#555555' },
  loginLink: { color: '#00A86B', fontWeight: 'bold' },
});