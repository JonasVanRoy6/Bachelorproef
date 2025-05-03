import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function GoalsScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedGoal) {
      Alert.alert('Fout', 'Selecteer een doel voordat je verder gaat.');
      return;
    }

    Alert.alert('Succes', `Je doel is ingesteld: ${selectedGoal}`);
    router.push('/whyScreen'); // Navigeer naar het "Waarom"-scherm
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Wat is je doel?</Text>

      <TouchableOpacity
        style={[styles.goalButton, selectedGoal === 'Stoppen met vapen' && styles.goalButtonSelected]}
        onPress={() => setSelectedGoal('Stoppen met vapen')}
      >
        <Text style={styles.goalButtonText}>Stoppen met vapen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.goalButton, selectedGoal === 'Minder puffs nemen' && styles.goalButtonSelected]}
        onPress={() => setSelectedGoal('Minder puffs nemen')}
      >
        <Text style={styles.goalButtonText}>Minder puffs nemen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.goalButton, selectedGoal === 'Bewuster worden van mijn gebruik' && styles.goalButtonSelected]}
        onPress={() => setSelectedGoal('Bewuster worden van mijn gebruik')}
      >
        <Text style={styles.goalButtonText}>Bewuster worden van mijn gebruik</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.goalButton, selectedGoal === 'Ik weet het nog niet' && styles.goalButtonSelected]}
        onPress={() => setSelectedGoal('Ik weet het nog niet')}
      >
        <Text style={styles.goalButtonText}>Ik weet het nog niet</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  goalButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  goalButtonSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#E6F4EA',
  },
  goalButtonText: {
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