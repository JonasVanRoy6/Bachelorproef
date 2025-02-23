import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Dit importeren
import { usePuffs } from './screens/PuffContext';import { Link } from 'expo-router';

const TrackerScreen = () => {
  const navigation = useNavigation(); // Gebruik useNavigation in plaats van de prop
  const context = usePuffs();

  // Debug-log om de waarde van context te controleren
  console.log("TrackerScreen - context:", context);

  // Als de context null is (gebruik buiten de PuffProvider), toon dan een foutmelding
  if (!context) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Fout: usePuffs() kan niet worden gebruikt buiten PuffProvider!
        </Text>
      </View>
    );
  }

  const { puffs } = context;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Puffs Vandaag:</Text>
        <Text style={styles.puffCount}>
          <Text style={styles.boldText}>{puffs}</Text>/80
        </Text>
        <Text style={styles.remainingPuffs}>{80 - puffs} puffs over</Text>
      </View>

      

<Link href="/screens/AddPuffsScreen">
  <TouchableOpacity style={styles.addButton}>
    <Text style={styles.addButtonText}>+ Manueel Puffs Toevoegen</Text>
  </TouchableOpacity>
</Link>



    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  puffCount: { fontSize: 24, fontWeight: 'bold' },
  boldText: { fontSize: 28, fontWeight: 'bold' },
  remainingPuffs: { fontSize: 14, color: 'gray', marginBottom: 10 },
  addButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 }
});

export default TrackerScreen;
