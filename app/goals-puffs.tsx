import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DoelenPuffsScreen() {
  const [current, setCurrent] = useState('');
  const [goal, setGoal] = useState('');
  const router = useRouter();

  const savePuffs = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Gebruiker niet gevonden. Log opnieuw in.');
        return;
      }

      console.log('Verstuurde gegevens:', { userId, currentUsage: current, goalsUsage: goal });

      const response = await fetch('http://192.168.0.105:5000/user/update-puffs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, currentUsage: current, goalsUsage: goal }),
      });

      if (response.ok) {
        Alert.alert('Succes', 'Gebruik succesvol opgeslagen!');
        router.push('/settings?updated=doelen'); // Navigeer naar instellingen of een ander scherm
      } else {
        const errorData = await response.json();
        console.error('Foutmelding van server:', errorData);
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het opslaan van het gebruik.');
      }
    } catch (error) {
      console.error('Fout bij het opslaan van het gebruik:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Doelen Aanpassen</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.label}>Hoeveel puffs neem je gemiddeld per dag?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={current}
        onChangeText={setCurrent}
        placeholder="80"
      />

      <Text style={styles.label}>Wat is je doel? Hoeveel puffs wil je per dag nemen?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
        placeholder="30"
      />

      <TouchableOpacity
        style={[styles.button, (!current || !goal) && styles.buttonDisabled]}
        onPress={savePuffs}
        disabled={!current || !goal}
      >
        <Text style={styles.buttonText}>Opslaan</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonDisabled: {
    backgroundColor: '#E3E3E3',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
