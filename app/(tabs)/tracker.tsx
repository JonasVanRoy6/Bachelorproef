// app/(tabs)/tracker.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { usePuffs } from '../puffcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrackerScreen() {
  const context = usePuffs();
  const [recentPuffs, setRecentPuffs] = useState([]);
  const [totalPuffsToday, setTotalPuffsToday] = useState(0); // Houd het totaal aantal puffs van vandaag bij

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
  const maxPuffs = 80;
  const remaining = Math.max(0, maxPuffs - totalPuffsToday); // Gebruik het totaal aantal puffs van vandaag
  const progressWidth = Math.min((totalPuffsToday / maxPuffs) * 100, 100);

  // Haal recente puffs op van de backend
  useEffect(() => {
    const fetchRecentPuffs = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Haal de user_id op
        console.log(`Ophalen van userId uit AsyncStorage: ${userId}`); // Debugging
        if (!userId) {
          console.error("Gebruiker niet gevonden. Log opnieuw in.");
          return;
        }

        const response = await fetch(`http://192.168.0.105:5000/puffs?userId=${userId}`);
        const data = await response.json();
        console.log("Recente puffs data:", data); // Debugging
        setRecentPuffs(Array.isArray(data) ? data : []); // Zorg ervoor dat recentPuffs altijd een array is
      } catch (error) {
        console.error("Fout bij het ophalen van recente puffs:", error);
        setRecentPuffs([]); // Stel een lege array in bij een fout
      }
    };

    fetchRecentPuffs();
  }, []);

  useEffect(() => {
    const fetchTotalPuffsToday = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Haal de user_id op
        console.log(`Ophalen van userId uit AsyncStorage: ${userId}`); // Debugging
        if (!userId) {
          console.error("Gebruiker niet gevonden. Log opnieuw in.");
          return;
        }

        const response = await fetch(`http://192.168.0.105:5000/puffs/today?userId=${userId}`);
        const data = await response.json();
        console.log("Puffs data:", data); // Debugging
        setTotalPuffsToday(data.total_puffs || 0); // Stel het totaal aantal puffs van vandaag in
      } catch (error) {
        console.error("Fout bij het ophalen van het totaal aantal puffs van vandaag:", error);
        setTotalPuffsToday(0); // Stel 0 in bij een fout
      }
    };

    fetchTotalPuffsToday();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={[styles.puffCard, styles.centered]}>
        <Text style={styles.puffTitle}>Puffs Vandaag:</Text>
        <Text style={styles.puffCount}>
          <Text style={styles.puffValue}>{totalPuffsToday}</Text>/<Text style={styles.puffMax}>{maxPuffs}</Text>
        </Text>
        <Text style={styles.puffsLeft}>{remaining} puffs over</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
        </View>
      </View>

      <Link href="/screens/AddPuffsScreen" asChild>
        <TouchableOpacity style={styles.manualAddBtn}>
          <Text style={styles.manualAddText}>+ Manueel Puffs Toevoegen</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.activityHeader}>Recente Activiteit</Text>
      <View style={styles.activityCard}>
        {recentPuffs.map((item, index) => (
          <View key={index}>
            <View style={styles.activityEntry}>
              <Text style={styles.activityTime}>
                {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text style={styles.activityText}>
                {item.amount} puffs - {item.time_of_day}
              </Text>
            </View>
            {index < recentPuffs.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  centered: {
    alignItems: 'center',
  },
  puffCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    padding: 20,
    marginBottom: 16,
  },
  puffTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
    textAlign: 'center',
  },
  puffCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  puffValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#252525',
  },
  puffMax: {
    fontSize: 48,
    color: '#252525',
  },
  puffsLeft: {
    fontSize: 16,
    color: '#515151',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#DFF5E5',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    backgroundColor: '#29A86E',
    height: '100%',
  },
  manualAddBtn: {
    height: 53,
    backgroundColor: '#252525',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  manualAddText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    padding: 20,
    marginBottom: 32,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#515151',
  },
  statusPill: {
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusPillText: {
    color: '#29A86E',
    fontSize: 14,
  },
  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 14,
    color: '#252525',
  },
  activityHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    padding: 20,
    marginBottom: 16
  },
  activityEntry: {
    marginBottom: 16,
  },
  activityTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#252525',
    marginBottom: 4,
  },
  activityText: {
    fontSize: 14,
    color: '#515151',
  },
  divider: {
    height: 1,
    backgroundColor: '#E3E3E3',
    marginBottom: 16,
  },
});
