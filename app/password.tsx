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
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../server/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const horizontalPadding = 36;

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Voor het eerste wachtwoordveld
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Voor het bevestigingswachtwoordveld
  const [userId, setUserId] = useState(null);

  // Haal userId op uit AsyncStorage als component mount
  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) setUserId(id);
      } catch (e) {
        console.error('Fout bij ophalen userId:', e);
      }
    };

    getUserId();
  }, []);

  const handleSavePassword = async () => {
    if (!userId) {
      Alert.alert('Fout', 'Gebruiker niet gevonden. Probeer opnieuw in te loggen.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Fout', 'Wachtwoorden komen niet overeen.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, userId }),
      });

      if (response.ok) {
        Alert.alert('Succes', 'Wachtwoord succesvol opgeslagen!');
        router.push('/usageScreen');
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
                  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
            secureTextEntry={!showPassword} // Verberg of toon het wachtwoord
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>{showPassword ? 'Verberg' : 'Toon'}</Text>
          </TouchableOpacity>
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
            secureTextEntry={!showConfirmPassword} // Verberg of toon het wachtwoord
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={styles.showText}>{showConfirmPassword ? 'Verberg' : 'Toon'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Volgende knop */}
      <TouchableOpacity style={styles.nextButton} onPress={handleSavePassword}>
        <Text style={styles.nextButtonText}>Volgende</Text>
      </TouchableOpacity>

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
