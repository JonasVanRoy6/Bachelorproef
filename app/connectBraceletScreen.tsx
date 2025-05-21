import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ConnectBraceletScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Icon in cirkel */}
        <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="watch" size={68} color="#29A86E" />
        </View>

        {/* Titel */}
        <Text style={styles.title}>Maak verbinding met je armband!</Text>

        {/* Uitlegtekst */}
        <Text style={styles.subtitle}>
          Zorg dat je Bluetooth is ingeschakeld en dat je apparaat dichtbij is. Sluit de app niet tijdens het verbinden.
        </Text>

        {/* Primaire knop */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/braceletConnectedScreen')}
        >
          <Text style={styles.primaryButtonText}>Begin met zoeken</Text>
        </TouchableOpacity>

        {/* Secundaire tekstlink */}
        <TouchableOpacity
          style={styles.secondaryLink}
          onPress={() => router.push('/startJourneyScreen')}
        >
          <Text style={styles.secondaryLinkText}>Ga verder zonder armband</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentWrapper: {
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#515151',
    textAlign: 'center',
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#29A86E',
    borderRadius: 16,
    width: '100%',
    maxWidth: 330,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryLink: {
    marginTop: 4,
  },
  secondaryLinkText: {
    fontSize: 14,
    color: '#252525',
    textDecorationLine: 'underline',
  },
});
