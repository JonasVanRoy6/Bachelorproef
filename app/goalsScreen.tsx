import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import API_BASE_URL from '../server/config';

const { width } = Dimensions.get('window');

export default function GoalsScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Fout', 'Gebruiker niet gevonden. Log opnieuw in.');
        router.push('/login');
      }
    };
    fetchUserId();
  }, []);

  const handleNext = async () => {
    if (!selectedGoal) {
      Alert.alert('Fout', 'Selecteer een doel voordat je verder gaat.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/saveGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, goal: selectedGoal }),
      });

      if (!response.ok) throw new Error();

      router.push('/whyScreen');
    } catch (error) {
      Alert.alert('Fout', 'Er is een fout opgetreden bij het opslaan van het doel.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Terugknop die naar /password gaat */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/password')}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Wat is je doel?</Text>

      {[
        'Stoppen met vapen',
        'Minder puffs nemen',
        'Bewuster worden van mijn gebruik',
        'Ik weet het nog niet',
      ].map((goal, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedGoal === goal && styles.optionSelected,
          ]}
          onPress={() => setSelectedGoal(goal)}
        >
          <Text style={styles.optionText}>{goal}</Text>
        </TouchableOpacity>
      ))}

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
    marginBottom: 32,
    fontFamily: 'Poppins', // Zorg dat dit font correct is ingesteld of installeer het via expo-font
  },
  optionButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  optionSelected: {
    borderColor: '#29A86E',
    backgroundColor: '#E6F4EA',
  },
  optionText: {
    fontSize: 16,
    color: '#252525',
  },
  nextButton: {
    marginTop: 32,
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
