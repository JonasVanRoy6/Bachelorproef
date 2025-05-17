import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BraceletConnectedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Text style={styles.checkmark}>✔</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Armband Verbonden!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Je armband is succesvol gekoppeld met je apparaat.
      </Text>

      {/* Important Notice */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Belangrijke Mededeling</Text>
        <Text style={styles.infoText}>
          Het verwijderen van de armband beëindigt direct je vape-vrije reeks. Zorg ervoor dat je deze draagt om je voortgang te behouden.
        </Text>
      </View>

      {/* Placement Notice */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Juiste Plaatsing</Text>
        <Text style={styles.infoText}>
          Draag de armband op de arm die je meestal gebruikt tijdens het vapen. Dit zorgt voor optimale tracking en effectiviteit.
        </Text>
      </View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Apparaatstatus</Text>
        <Text style={styles.statusValue}>Verbonden</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Batterijniveau</Text>
        <Text style={styles.statusValue}>85%</Text>
      </View>

      {/* Ga verder knop */}
      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/startJourneyScreen')}>
        <Text style={styles.primaryButtonText}>Ga verder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
    color: '#00A86B',
    fontWeight: 'bold',
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
  infoCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 14,
    color: '#333333',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A86B',
  },
  primaryButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});