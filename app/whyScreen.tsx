import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function WhyScreen() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Haal het userId op uit AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log("Ophalen userId uit AsyncStorage:", storedUserId); // Debugging
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Fout', 'Gebruiker niet gevonden. Log opnieuw in.');
        router.push('/login'); // Stuur de gebruiker terug naar het inlogscherm
      }
    };

    fetchUserId();
  }, []);

  const handleNext = async () => {
    if (!selectedReason) {
      Alert.alert('Fout', 'Selecteer een reden voordat je verder gaat.');
      return;
    }

    const payload = { userId, reason: selectedReason }; // Stuur alleen de reason
    console.log("Verstuurde gegevens:", payload); // Debugging

    try {
      const response = await fetch('http://192.168.0.105:5000/saveGoal', {
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
        throw new Error(responseData.error || 'Er is een fout opgetreden bij het opslaan van de reden.');
      }

      Alert.alert('Succes', `Je reden is opgeslagen: ${selectedReason}`);
      router.push('/usageScreen'); // Navigeer naar het volgende scherm
    } catch (error) {
      console.error("Fout bij het opslaan:", error); // Debugging
      Alert.alert('Fout', 'Er is een fout opgetreden bij het opslaan van de reden.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waarom wil je dit doen?</Text>

      <TouchableOpacity
        style={[styles.reasonButton, selectedReason === 'Voor mijn gezondheid' && styles.reasonButtonSelected]}
        onPress={() => setSelectedReason('Voor mijn gezondheid')}
      >
        <Text style={styles.reasonButtonText}>Voor mijn gezondheid</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.reasonButton, selectedReason === 'Om geld te besparen' && styles.reasonButtonSelected]}
        onPress={() => setSelectedReason('Om geld te besparen')}
      >
        <Text style={styles.reasonButtonText}>Om geld te besparen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.reasonButton, selectedReason === 'Voor mijn familie of vrienden' && styles.reasonButtonSelected]}
        onPress={() => setSelectedReason('Voor mijn familie of vrienden')}
      >
        <Text style={styles.reasonButtonText}>Voor mijn familie of vrienden</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.reasonButton, selectedReason === 'Voor mijn welzijn' && styles.reasonButtonSelected]}
        onPress={() => setSelectedReason('Voor mijn welzijn')}
      >
        <Text style={styles.reasonButtonText}>Voor mijn welzijn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Volgende</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  reasonButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  reasonButtonSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#E6F4EA',
  },
  reasonButtonText: {
    fontSize: 16,
    color: '#333333',
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