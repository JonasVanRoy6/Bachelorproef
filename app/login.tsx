import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router'; // Gebruik de router voor navigatie
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialiseer de router

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fout', 'Vul alle velden in.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.105:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userId', data.userId.toString()); // Sla de user_id op
        Alert.alert('Succes', `Welkom terug, ${data.firstName}!`);
        router.push('/'); // Navigeer naar de index.tsx-pagina
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
      <Text style={styles.title}>Welkom terug, Tester!</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mailadres"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Inloggen</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Of, inloggen met...</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>F</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>G</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Nieuw bij Breezd?  
        <Link href="/(tabs)/register" asChild><Text style={styles.registerLink}>Registreer</Text>
      </Link></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  loginButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888888',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  registerText: {
    textAlign: 'center',
    color: '#555555',
  },
  registerLink: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
});