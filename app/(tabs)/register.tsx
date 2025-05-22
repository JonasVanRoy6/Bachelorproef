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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../../server/config';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = async () => {
    const data = { firstName, lastName, email, birthDate };

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        await AsyncStorage.setItem('userId', responseData.userId.toString());
        await AsyncStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
        await AsyncStorage.setItem('userEmail', data.email);
        Alert.alert('Succes', 'Gebruiker succesvol geregistreerd!');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het registreren.');
      }
    } catch (error) {
      console.error('Fout bij het maken van de HTTP-aanroep:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Welkom bij Breezd,{"\n"}registreer je.</Text>

      {/* Social buttons */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#EA4335" />
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Of, registreren met email...</Text>

      {/* Input row */}
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Voornaam</Text>
          <TextInput
            style={styles.input}
            placeholder="Voornaam"
            placeholderTextColor="#515151"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Achternaam</Text>
          <TextInput
            style={styles.input}
            placeholder="Achternaam"
            placeholderTextColor="#515151"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>

      <View style={styles.inputGroupFull}>
        <Text style={styles.label}>E-mailadres</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mailadres"
          keyboardType="email-address"
          placeholderTextColor="#515151"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroupFull}>
        <Text style={styles.label}>Geboortedatum</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / JJJJ"
          placeholderTextColor="#515151"
          value={birthDate}
          onChangeText={setBirthDate}
        />
      </View>

      {/* Volgende knop */}
      <Link href="/password" asChild>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Volgende</Text>
        </TouchableOpacity>
      </Link>

      {/* Log in */}
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
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 36,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: '#252525',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252525',
    lineHeight: 34,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#515151',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputGroupFull: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#252525',
  },
  registerButton: {
    marginTop: 24,
    backgroundColor: '#29A86E',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  loginText: {
    fontSize: 16,
    color: '#252525',
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#29A86E',
  },
});
