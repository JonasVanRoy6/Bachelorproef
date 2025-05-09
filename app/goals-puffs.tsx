import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DoelenPuffsScreen() {
  const [current, setCurrent] = useState('');
  const [goal, setGoal] = useState('');
  const router = useRouter();

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
        style={styles.button}
        onPress={() => router.push('/settings?updated=doelen')}
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
