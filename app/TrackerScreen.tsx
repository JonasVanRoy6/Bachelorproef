import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePuffs } from './screens/PuffContext';
import { Link } from 'expo-router';

const TrackerScreen = () => {
  const navigation = useNavigation();
  const context = usePuffs();

  console.log("TrackerScreen - context:", context);

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
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(puffs / 80) * 100}%` }]} />
        </View>
      </View>

      <Link href="/screens/AddPuffsScreen" style={styles.link}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Manueel Puffs Toevoegen</Text>
        </View>
      </Link>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Status Armband</Text>
        <Text style={styles.statusText}>Verbonden</Text>
        <Text style={styles.batteryText}>85% Batterij</Text>
      </View>

      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>Recente Activiteit</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityTime}>10:45</Text>
          <Text style={styles.activityText}>7 puffs gedetecteerd</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityTime}>09:48</Text>
          <Text style={styles.activityText}>3 puffs gedetecteerd</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityTime}>09:48</Text>
          <Text style={styles.activityText}>3 puffs gedetecteerd</Text>
        </View>
      </View>
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
  progressBar: { width: '100%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden', marginTop: 10 },
  progress: { height: '100%', backgroundColor: '#4caf50' },
  link: { alignSelf: 'center', marginBottom: 15 },
  addButton: { backgroundColor: 'black', padding: 15, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  statusCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  statusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  statusText: { fontSize: 16, color: 'green', marginBottom: 5 },
  batteryText: { fontSize: 14, color: 'gray' },
  activityCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15 },
  activityTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  activityItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  activityTime: { fontSize: 14, color: 'gray' },
  activityText: { fontSize: 14 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 }
});

export default TrackerScreen;
