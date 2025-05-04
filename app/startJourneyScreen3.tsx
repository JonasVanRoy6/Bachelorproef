import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function StartJourneyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Afbeelding */}
      <Image
        source={require('../assets/images/journey.png')} // Zorg ervoor dat je afbeelding in de juiste map staat
        style={styles.image}
        resizeMode="contain"
      />

      {/* Titel */}
      <Text style={styles.title}>Daag jezelf en anderen uit</Text>

      {/* Ondertekst */}
      <Text style={styles.subtitle}>
      Neem uitdagingen aan, nodig vrienden uit en strijd samen op het leaderboard. Samen stoppen is makkelijker én leuker!
      </Text>

      {/* Volgende knop */}
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/startJourneyScreen2')}>
        <Text style={styles.nextButtonText}>Volgende</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});