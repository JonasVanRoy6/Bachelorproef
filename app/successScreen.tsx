import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      {/* Succesvolle registratie */}
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Text style={styles.checkmark}>✔</Text>
        </View>
      </View>
      <Text style={styles.title}>Proficiat!</Text>
      <Text style={styles.subtitle}>
        Je account is aangemaakt. Je hebt de eerste stap gezet naar een vape-vrije toekomst. We zijn trots op je!
      </Text>

      {/* Volgende knop */}
      <Link href="/connectBraceletScreen" style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Volgende</Text>
      </Link>
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
  iconContainer: {
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
    marginBottom: 10,
    textAlign: 'center',
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