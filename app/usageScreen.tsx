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
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../server/config';

const { width } = Dimensions.get('window');

export default function UsageScreen() {
  const [currentUsage, setCurrentUsage] = useState('');
  const [goalUsage, setGoalUsage] = useState('');

  const handleNext = async () => {
    if (!currentUsage || !goalUsage) {
      Alert.alert('Fout', 'Vul beide velden in voordat je verder gaat.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Fout', 'Gebruiker niet gevonden. Log opnieuw in.');
        return;
      }

      const payload = {
        userId,
        currentUsage: parseInt(currentUsage, 10),
        goalUsage: parseInt(goalUsage, 10),
      };

      const response = await fetch(`${API_BASE_URL}/saveGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      router.push('/successScreen'); // Navigeer naar de succespagina
    } catch (error) {
      Alert.alert('Fout', 'Er is een fout opgetreden bij het opslaan van de gegevens.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Terugknop naar whyScreen */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/password')}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Stel je huidige gebruik en je doel in.</Text>
      <Text style={styles.subtitle}>Geen zorgen, je kan dit later altijd aanpassen.</Text>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.label}>Hoeveel puffs neem je gemiddeld per dag?</Text>
        <TextInput
          style={styles.input}
          placeholder="80"
          placeholderTextColor="#515151"
          keyboardType="numeric"
          value={currentUsage}
          onChangeText={setCurrentUsage}
        />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.label}>Wat is je doel? Hoeveel puffs wil je per dag nemen?</Text>
        <TextInput
          style={styles.input}
          placeholder="30"
          placeholderTextColor="#515151"
          keyboardType="numeric"
          value={goalUsage}
          onChangeText={setGoalUsage}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Volgende</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 36,
    paddingTop: 48,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
    lineHeight: 39,
  },
  subtitle: {
    fontSize: 16,
    color: '#515151',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#252525',
  },
  nextButton: {
    marginTop: 66,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
});
