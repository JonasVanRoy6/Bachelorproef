import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../server/config';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    // Controleer of alle velden zijn ingevuld
    if (!firstName || !lastName || !email || !birthDate) {
      Alert.alert('Fout', 'Vul alle velden in.');
      return; // Stop de registratie als een veld leeg is
    }

    // Controleer of het e-mailadres geldig is
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Ongeldig e-mailadres', 'Voer een geldig e-mailadres in.');
      return; // Stop de registratie als het e-mailadres ongeldig is
    }

    // Controleer of de geboortedatum correct is (DD/MM/JJJJ)
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      Alert.alert('Ongeldige geboortedatum', 'Voer een geldige geboortedatum in (DD/MM/JJJJ).');
      return; // Stop de registratie als de geboortedatum ongeldig is
    }

    // Converteer geboortedatum naar JJJJ-MM-DD
    const [day, month, year] = birthDate.split('/');
    const formattedBirthDate = `${year}-${month}-${day}`;

    const data = { firstName, lastName, email, birthDate: formattedBirthDate };

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Succesvolle registratie:', responseData);

        // Sla de gebruikersgegevens op in AsyncStorage
        await AsyncStorage.setItem('userId', responseData.userId.toString());
        await AsyncStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
        await AsyncStorage.setItem('userEmail', data.email);

        // Toon een succesmelding
        Alert.alert('Succes', 'Gebruiker succesvol geregistreerd!');

        // Navigeer naar het volgende scherm
        router.push('/password'); // Gebruik router.push om naar het volgende scherm te navigeren
      } else {
        console.error('Fout bij registratie:', responseData);
        Alert.alert('Fout', responseData.error || 'Er is een probleem opgetreden bij het registreren.');
      }
    } catch (error) {
      console.error('Fout bij het maken van de HTTP-aanroep:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Zorgt voor extra ruimte boven het toetsenbord
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // Zorgt ervoor dat tikken buiten het toetsenbord het toetsenbord sluit
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.backButton} onPress={() => router.push('/')}>
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
            keyboardType="numeric" // Numeriek toetsenbord
            onChangeText={(text) => {
              // Verwijder niet-numerieke karakters
              let formattedText = text.replace(/[^0-9]/g, '');

              // Voeg `/` toe op de juiste posities
              if (formattedText.length > 2 && formattedText.length <= 4) {
                formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
              } else if (formattedText.length > 4) {
                formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
              }

              // Beperk de lengte tot 10 karakters (DD/MM/JJJJ)
              if (formattedText.length > 10) {
                formattedText = formattedText.slice(0, 10);
              }

              setBirthDate(formattedText);
            }}
          />
        </View>

        {/* Volgende knop */}
       
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Volgende</Text>
          </TouchableOpacity>
        

        {/* Log in */}
        <Text style={styles.loginText}>
          Al een account?{' '}
          <Link href="/login" asChild>
            <Text style={styles.loginLink}>Log in</Text>
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Zorgt ervoor dat de inhoud scrollbaar blijft
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
