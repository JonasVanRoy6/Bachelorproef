import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const reasons = [
  'Voor mijn gezondheid',
  'Om geld te besparen',
  'Voor mijn familie of vrienden',
  'Voor mijn welzijn',
];

export default function GoalsWhyScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Doelen Aanpassen</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.question}>Waarom wil je dit doen?</Text>

      {reasons.map((reason, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === reason && styles.optionSelected
          ]}
          onPress={() => setSelected(reason)}
        >
          <Text style={[
            styles.optionText,
            selected === reason && styles.optionTextSelected
          ]}>{reason}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/goals-puffs')}
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
