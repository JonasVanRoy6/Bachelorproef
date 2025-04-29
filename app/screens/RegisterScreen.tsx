import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = async () => {
    const data = {
      firstName,
      lastName,
      email,
      birthDate,
    };

    console.log("Verzonden gegevens:", data); // Controleer de gegevens die worden verzonden

    try {
      const response = await fetch('http://192.168.0.105:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        Alert.alert('Succes', 'Gebruiker succesvol geregistreerd!');
      } else {
        const errorData = await response.json();
        console.error("Foutmelding van server:", errorData);
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het registreren.');
      }
    } catch (error) {
      console.error('Fout bij het maken van de HTTP-aanroep:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welkom bij Naam, registreer je.</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>F</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>G</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Of, registreren met email...</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Voornaam"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Achternaam"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="E-mailadres"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Geboortedatum (DD / MM / JJJJ)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Link href="/screens/PasswordScreen" asChild>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Volgende</Text>
      </TouchableOpacity>
      </Link>
      <Text style={styles.loginText}>
        Al een account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
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
  orText: {
    textAlign: 'center',
    color: '#888888',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  inputHalf: {
    width: '48%',
  },
  registerButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#555555',
  },
  loginLink: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
});