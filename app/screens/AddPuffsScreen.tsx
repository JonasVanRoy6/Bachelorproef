import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const AddPuffsScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  

  const handleSave = async () => {
    const amount = parseInt(input);
    if (!isNaN(amount) && amount > 0) {
      try {
        // Verstuur de puffs naar de backend
        await axios.post("http://10.0.2.2:5000/puffs", { puffs: amount });

        // Toon succesbericht
        Alert.alert("Succes", "Puffs opgeslagen!");

        // Navigeer naar de TrackerScreen (verander 'TrackerScreen' naar de naam van je scherm)
        navigation.navigate('TrackerScreen');  // De naam van het scherm waar je naartoe wilt navigeren
      } catch (error) {
        console.error("Fout bij opslaan puffs:", error);
        
      }
    } else {
      Alert.alert("Ongeldige invoer", "Voer een geldig getal in.");
    }
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
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, width: 100, textAlign: "center", marginBottom: 10, padding: 5 },
});

export default AddPuffsScreen;
