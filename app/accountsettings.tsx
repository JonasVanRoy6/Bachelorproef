import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatDateToEuropean = (date) => {
  if (!date) return '';
  const parsedDate = new Date(date); // Maak een Date-object van de ISO-datum
  const day = String(parsedDate.getDate()).padStart(2, '0'); // Zorg ervoor dat de dag 2 cijfers heeft
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Maanden zijn 0-gebaseerd
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`; // Retourneer de datum in DD/MM/YYYY-formaat
};

const formatDateToISO = (date) => {
  if (!date) return '';
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

const AccountSettingsScreen = () => {
  const [firstName, setFirstName] = useState('Tester');
  const [lastName, setLastName] = useState('Achternaam');
  const [email, setEmail] = useState('test1@gmail.com');
  const [birthDate, setBirthDate] = useState('14 / 01 / 2003');
  const [password, setPassword] = useState('******'); // Placeholder voor het wachtwoord
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Beheer de zichtbaarheid van het wachtwoord
  const [birthDateInput, setBirthDateInput] = useState(''); // Tijdelijke invoer voor geboortedatum

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user-data?userId=${userId}`);
        const data = await response.json();

        console.log('Gebruikersgegevens:', data); // Log de API-respons

        if (response.ok) {
          setFirstName(data.firstName);
          setLastName(data.lastName); // Controleer of lastName correct wordt ingesteld
          setEmail(data.email);
          setBirthDate(data.birthDate); // Controleer of birthDate correct wordt ingesteld
          setBirthDateInput(formatDateToEuropean(data.birthDate)); // Format de geboortedatum
          setPassword(data.password);
        } else {
          alert(data.error || 'Er is iets misgegaan bij het ophalen van gebruikersgegevens.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van gebruikersgegevens:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchUserData();
  }, []);

  const updateUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      // Converteer de geboortedatum naar ISO-formaat
      const formattedBirthDate = formatDateToISO(birthDateInput);

      const response = await fetch(`${API_BASE_URL}/update-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          firstName,
          lastName,
          email,
          birthDate: formattedBirthDate, // Gebruik de geformatteerde geboortedatum
          newPassword: newPassword || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Gebruikersgegevens succesvol bijgewerkt.');
        setNewPassword(''); // Wis het nieuwe wachtwoord na succesvol opslaan
        setBirthDate(formattedBirthDate); // Werk de geboortedatum bij in de originele state
      } else {
        alert(data.error || 'Er is iets misgegaan bij het bijwerken van gebruikersgegevens.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van gebruikersgegevens:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={24} color="#29A86E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Accountinstellingen</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Naamvelden */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Voornaam</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Achternaam</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
              </View>
            </View>
          </View>

          {/* E-mailadres */}
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>E-mailadres</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            </View>
          </View>

          {/* Geboortedatum */}
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>Geboortedatum</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={birthDateInput} // Gebruik de tijdelijke invoer
                onChangeText={(text) => setBirthDateInput(text)} // Werk de tijdelijke invoer bij
                placeholder="DD/MM/YYYY"
                keyboardType="numeric" // Zorg ervoor dat alleen numerieke invoer mogelijk is
              />
            </View>
          </View>

          {/* Wachtwoord */}
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>Wachtwoord</Text>
            <View style={styles.inputWithButton}>
              <TextInput
                style={styles.input}
                value={password} // Toon het wachtwoord uit de database
                secureTextEntry={!showPassword} // Verberg of toon het wachtwoord
                onChangeText={setPassword} // Sta toe dat het wachtwoord wordt aangepast
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Wissel de zichtbaarheid
                style={styles.showButton}
              >
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'} // Toon een oog-icoon
                  size={20}
                  color="#29A86E"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nieuw wachtwoord */}
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>Nieuw Wachtwoord</Text>
            <View style={styles.inputWithButton}>
              <TextInput
                style={styles.input}
                placeholder="Geef je nieuw wachtwoord in"
                placeholderTextColor="#515151"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.showButton}
              >
                <FontAwesome
                  name={showNewPassword ? 'eye-slash' : 'eye'} // Wissel het oog-icoon
                  size={20}
                  color="#29A86E"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Opslaan knop */}
          <TouchableOpacity onPress={updateUserData} style={styles.button}>
            <Text style={styles.buttonText}>Wijzigingen opslaan</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: 64,
    paddingBottom: 80,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
  },
  inputGroupFull: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    padding: 0,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 12,
  },
  showButton: {
    marginLeft: 'auto',
  },
  toonText: {
    fontSize: 14,
    color: '#29A86E',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#29A86E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AccountSettingsScreen;
