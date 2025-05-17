import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsageScreen() {
  const [currentUsage, setCurrentUsage] = useState('');
  const [goalUsage, setGoalUsage] = useState('');

  const handleNext = async () => {
    if (!currentUsage || !goalUsage) {
      Alert.alert('Fout', 'Vul beide velden in voordat je verder gaat.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId'); // Haal het userId op uit AsyncStorage
      if (!userId) {
        Alert.alert('Fout', 'Gebruiker niet gevonden. Log opnieuw in.');
        return;
      }

      const payload = {
        userId,
        currentUsage: parseInt(currentUsage, 10),
        goalUsage: parseInt(goalUsage, 10),
      };

      console.log("Verstuurde gegevens:", payload); // Debugging

      const response = await fetch('http://192.168.0.130:5000/saveGoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Response van backend:", responseData); // Debugging

      if (!response.ok) {
        console.error("Fout van server:", responseData); // Debugging
        throw new Error(responseData.error || 'Er is een fout opgetreden bij het opslaan van de gegevens.');
      }

      Alert.alert('Succes', 'Je gegevens zijn opgeslagen.');
      router.push('/planScreen'); // Navigeer naar het volgende scherm
    } catch (error) {
      console.error("Fout bij het opslaan:", error); // Debugging
      Alert.alert('Fout', 'Er is een fout opgetreden bij het opslaan van de gegevens.');
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/whyScreen" style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </Link>

      <Text style={styles.title}>Stel je huidige gebruik en je doel in.</Text>
      <Text style={styles.subtitle}>Geen zorgen, je kan dit later altijd aanpassen.</Text>

      <Text style={styles.label}>Hoeveel puffs neem je gemiddeld per dag?</Text>
      <TextInput
        style={styles.input}
        placeholder="Bijvoorbeeld: 80"
        keyboardType="numeric"
        value={currentUsage}
        onChangeText={setCurrentUsage}
      />

      <Text style={styles.label}>Wat is je doel? Hoeveel puffs wil je per dag nemen?</Text>
      <TextInput
        style={styles.input}
        placeholder="Bijvoorbeeld: 30"
        keyboardType="numeric"
        value={goalUsage}
        onChangeText={setGoalUsage}
      />
<Link href="/planScreen" asChild>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Volgende</Text>
      </TouchableOpacity></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});