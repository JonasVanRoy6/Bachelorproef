import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPuffsScreen = () => {
  const [duration, setDuration] = useState(120);
  const [intensity, setIntensity] = useState('Gemiddeld');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [estimatedPuffs, setEstimatedPuffs] = useState(0);

  useEffect(() => {
    calculatePuffs();
  }, [duration, intensity]);

  const calculatePuffs = () => {
    let basePuffs = duration / 2;
    if (intensity === 'Weinig') basePuffs *= 0.5;
    if (intensity === 'Veel') basePuffs *= 1.5;
    setEstimatedPuffs(Math.round(basePuffs));
  };

  const handleSave = async () => {
    if (estimatedPuffs > 0 && timeOfDay) {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Haal de userId op uit AsyncStorage
        if (!userId) {
          Alert.alert("Fout", "Gebruiker niet gevonden. Log opnieuw in.");
          return;
        }

        const payload = {
          userId,
          puffs: estimatedPuffs,
          timeOfDay,
        };

        console.log("Verstuurde gegevens:", payload); // Debugging

        const response = await fetch("http://192.168.0.130:5000/puffs", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        Alert.alert("Succes", "Puffs en tijd van de dag opgeslagen!");
        router.push('/'); // Navigeer terug naar de homepagina
      } catch (error) {
        console.error("Fout bij opslaan puffs:", error);
        Alert.alert("Fout", "Er is een fout opgetreden bij het opslaan van de gegevens.");
      }
    } else {
      Alert.alert("Ongeldige invoer", "Voer geldige gegevens in en selecteer een tijd van de dag.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoe lang heb je gevaped?</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={240}
        step={1}
        value={duration}
        onSlidingComplete={setDuration}
      />
      <Text>{duration} min</Text>

      <Text style={styles.title}>Vape-intensiteit</Text>
      <View style={styles.intensityContainer}>
        {['Weinig', 'Gemiddeld', 'Veel'].map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.intensityButton, intensity === level && styles.selectedButton]}
            onPress={() => setIntensity(level)}
          >
            <Text style={styles.intensityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Wanneer heb je het meest gevaped?</Text>
      <View style={styles.timeContainer}>
        {['Ochtend (6:00 - 12:00)', 'Middag (12:00 - 18:00)', 'Avond (18:00 - 00:00)', 'Nacht (00:00 - 6:00)'].map(time => (
          <TouchableOpacity
            key={time}
            style={[styles.timeButton, timeOfDay === time && styles.selectedButton]}
            onPress={() => setTimeOfDay(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.estimatedPuffs}>Geschatte aantal puffs: {estimatedPuffs}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Opslaan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 18, marginBottom: 10 },
  slider: { width: '100%', height: 40 },
  intensityContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  intensityButton: { padding: 10, borderWidth: 1, borderRadius: 5 },
  selectedButton: { backgroundColor: '#4caf50', borderColor: '#4caf50' },
  intensityText: { fontSize: 16 },
  timeContainer: { marginBottom: 20 },
  timeButton: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  timeText: { fontSize: 16 },
  estimatedPuffs: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  saveButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
});

export default AddPuffsScreen;