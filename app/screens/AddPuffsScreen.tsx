import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { usePuffs } from '../screens/PuffContext';
import { useNavigation } from '@react-navigation/native'; // Gebruik useNavigation

const AddPuffsScreen = () => {
  const { setPuffs, puffs } = usePuffs();
  const [input, setInput] = useState('');
  const navigation = useNavigation(); // Gebruik useNavigation

  const handleSave = () => {
    const newPuffs = parseInt(input);
    
    if (isNaN(newPuffs)) {
      alert("Voer een geldig getal in!"); // Waarschuw de gebruiker voor een ongeldige invoer
      return;
    }
    
    setPuffs(puffs + newPuffs); // Update de waarde van puffs
    setInput(''); // Reset de invoer
    
    // Navigeer naar het juiste scherm
    navigation.navigate('TrackerScreen'); // Dit navigeert naar het TrackerScreen, pas aan naar jouw gewenste scherm
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voer het aantal puffs in:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Opslaan" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, width: 100, textAlign: 'center', marginBottom: 10, padding: 5 },
});

export default AddPuffsScreen;
