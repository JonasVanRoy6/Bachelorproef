// app/connected-armband.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const ConnectedArmband = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verbinding Armband</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Verbonden status */}
      <View style={styles.card}>
        <View style={styles.row}>
          <FontAwesome name="plug" size={20} color="#29A86E" />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Status Armband</Text>
            <Text style={styles.cardSubtitle}>Verbonden</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>Actief</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 12 }]}>
          <FontAwesome name="battery-three-quarters" size={20} color="#29A86E" />
          <Text style={[styles.cardSubtitle, { marginLeft: 10 }]}>85% Batterij</Text>
        </View>
      </View>

      {/* Ontkoppel knop */}
      <TouchableOpacity style={styles.disconnectButton}>
        <FontAwesome name="chain-broken" size={18} color="#252525" />
        <Text style={styles.disconnectText}>Armband Ontkoppelen</Text>
      </TouchableOpacity>

      {/* Beschikbare apparaten */}
      <Text style={styles.section}>BESCHIKBARE APPARATEN</Text>
      <View style={styles.deviceCard}>
        <FontAwesome name="plug" size={20} color="#252525" />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Status Armband</Text>
          <Text style={styles.cardSubtitle}>Klaar om te verbinden</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    fontFamily: 'Poppins',
  },
  section: {
    fontSize: 14,
    fontWeight: '500',
    color: '#515151',
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  card: {
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    fontFamily: 'Poppins',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#515151',
    fontFamily: 'Poppins',
  },
  statusPill: {
    backgroundColor: '#E1F6EC',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: '#29A86E',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 0.8,
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  disconnectText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginLeft: 10,
    color: '#252525',
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: '#fff',
  },
});

export default ConnectedArmband;
