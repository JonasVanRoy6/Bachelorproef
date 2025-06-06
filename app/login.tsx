import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../server/config';
import { isLoggedIn, login } from '../auth/auth';
 // ✅ check login status

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // ✅ Automatische redirect als al ingelogd
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        router.replace('/(tabs)/home'); // ↪️ direct door naar home als al ingelogd
      }
    };
    checkIfLoggedIn();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fout', 'Vul alle velden in.');
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // ⬇️ Belangrijke fix hier:
        await AsyncStorage.setItem('userId', data.userId.toString());
        await login(); // ✅ Set 'isLoggedIn' = true
  
        Alert.alert('Succes', `Welkom terug, ${data.firstName}!`);
  
        // Wacht heel even om race condition te voorkomen
        setTimeout(() => {
          router.replace('/(tabs)/home');
        }, 100);
      } else {
        const errorData = await response.json();
        Alert.alert('Fout', errorData.error || 'Inloggen mislukt.');
      }
    } catch (error) {
      console.error('Fout bij het maken van de HTTP-aanroep:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/register')}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Welkom terug!</Text>

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
        <Text style={styles.label}>Wachtwoord</Text>
        <TextInput
          style={styles.input}
          placeholder="Geef je wachtwoord in"
          secureTextEntry
          placeholderTextColor="#515151"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Inloggen</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Of, inloggen met...</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#EA4335" />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Nieuw bij Breezd?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => router.push('/register')}
        >
          Registreer
        </Text>
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
  loginButton: {
    marginTop: 24,
    backgroundColor: '#29A86E',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#515151',
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
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
  registerText: {
    fontSize: 16,
    color: '#252525',
    textAlign: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#29A86E',
  },
});
