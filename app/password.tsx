import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const horizontalPadding = 36;

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        Alert.alert('Succes', 'Wachtwoord succesvol opgeslagen!');
      } else {
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het opslaan van het wachtwoord.');
      }
    } catch (error) {
      console.error('Fout bij het opslaan van het wachtwoord:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Terugknop */}
      <View style={styles.backButtonWrapper}>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Titel */}
      <Text style={styles.title}>Wachtwoord kiezen.</Text>

      {/* Wachtwoord Input */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Wachtwoord</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Geef je wachtwoord in"
            placeholderTextColor="#515151"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.showText}>Toon</Text>
        </View>
      </View>

      {/* Bevestig wachtwoord Input */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Bevestig je wachtwoord</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Geef je wachtwoord in"
            placeholderTextColor="#515151"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Text style={styles.showText}>Toon</Text>
        </View>
      </View>

      {/* Volgende knop */}
      <Link href="/goalsScreen" asChild>
        <TouchableOpacity style={styles.nextButton} onPress={handleSavePassword}>
          <Text style={styles.nextButtonText}>Volgende</Text>
        </TouchableOpacity>
      </Link>

      {/* Log in link */}
      <Text style={styles.loginText}>
        Al een account?{' '}
        <Link href="/login" asChild>
          <Text style={styles.loginLink}>Log in</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: horizontalPadding,
    backgroundColor: '#fff',
  },
  backButtonWrapper: {
    marginTop: 48,
    marginBottom: 32,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252525',
    lineHeight: 39,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#252525',
  },
  showText: {
    fontSize: 14,
    color: '#515151',
  },
  nextButton: {
    marginTop: 66,
    backgroundColor: '#29A86E',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  loginText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#252525',
  },
  loginLink: {
    color: '#29A86E',
    fontWeight: 'bold',
  },
});
