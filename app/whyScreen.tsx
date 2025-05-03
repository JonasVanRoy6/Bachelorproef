import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function WhyScreen() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    if (!selectedReason) {
      e.preventDefault(); // Voorkom navigatie
      Alert.alert('Fout', 'Selecteer een reden voordat je verder gaat.');
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/goals" style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </Link>

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

      {/* Maak de hele knop klikbaar en centreer de tekst */}
      <Link href="/usageScreen" style={styles.nextButton} onPress={handleNext}>
        <View style={[styles.nextButtonContent, { width: '100%' }]}>
          <Text style={styles.nextButtonText}>Volgende</Text>
        </View>
      </Link>
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
    marginTop: 20,
    alignItems: 'center', // Zorg ervoor dat de inhoud horizontaal gecentreerd is
    justifyContent: 'center', // Zorg ervoor dat de inhoud verticaal gecentreerd is
  },
  nextButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});