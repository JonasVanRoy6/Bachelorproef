import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const goals = [
  'Stoppen met vapen',
  'Minder puffs nemen',
  'Bewuster worden van mijn gebruik',
  'Ik weet het nog niet',
];

export default function GoalsStartScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const saveGoal = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Gebruiker niet gevonden. Log opnieuw in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/user/update-goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, goal: selected }),
      });

      if (response.ok) {
        Alert.alert('Succes', 'Doel succesvol opgeslagen!');
        router.push('/goals-why'); // Navigeer naar het volgende scherm
      } else {
        const errorData = await response.json();
        console.error('Foutmelding van server:', errorData);
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het opslaan van het doel.');
      }
    } catch (error) {
      console.error('Fout bij het opslaan van het doel:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Doelen Aanpassen</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.question}>Wat is je doel?</Text>

      {goals.map((goal, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === goal && styles.optionSelected,
          ]}
          onPress={() => setSelected(goal)}
        >
          <Text
            style={[
              styles.optionText,
              selected === goal && styles.optionTextSelected,
            ]}
          >
            {goal}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, !selected && styles.buttonDisabled]}
        onPress={saveGoal}
        disabled={!selected}
      >
        <Text style={styles.buttonText}>Volgende</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  optionSelected: {
    borderColor: '#29A86E',
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
  },
  optionText: {
    fontSize: 14,
    color: '#252525',
  },
  optionTextSelected: {
    color: '#29A86E',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E3E3E3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
