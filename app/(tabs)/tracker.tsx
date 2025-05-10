// app/(tabs)/tracker.tsx

import React from 'react';
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

export default function TrackerScreen() {
  const context = usePuffs();
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
  const remaining = Math.max(0, maxPuffs - puffs);
  const progressWidth = Math.min((puffs / maxPuffs) * 100, 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 64 }}>
      <View style={[styles.puffCard, styles.centered]}>
        <Text style={styles.puffTitle}>Puffs Vandaag:</Text>
        <Text style={styles.puffCount}>
          <Text style={styles.puffValue}>{puffs}</Text>/<Text style={styles.puffMax}>{maxPuffs}</Text>
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

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusTitle}>Status Armband</Text>
            <Text style={styles.statusSubtitle}>Verbonden</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>Actief</Text>
          </View>
        </View>
        <View style={styles.batteryRow}>
          <FontAwesome name="battery-three-quarters" size={16} color="#29A86E" style={{ marginRight: 8 }} />
          <Text style={styles.batteryText}>85% Batterij</Text>
        </View>
      </View>

      <Text style={styles.activityHeader}>Recente Activiteit</Text>
      <View style={styles.activityCard}>
        {[
          { time: '10:45', text: '7 puffs gedetecteerd' },
          { time: '09:48', text: '3 puffs gedetecteerd' },
          { time: '09:48', text: '3 puffs gedetecteerd' },
        ].map((item, index) => (
          <View key={index}>
            <View style={styles.activityEntry}>
              <Text style={styles.activityTime}>{item.time}</Text>
              <Text style={styles.activityText}>{item.text}</Text>
            </View>
            {index < 2 && <View style={styles.divider} />}
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
