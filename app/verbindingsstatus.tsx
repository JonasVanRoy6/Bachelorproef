// app/verbindingsstatus.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const VerbindingsStatusScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header met back button */}
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verbinding Armband</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Bluetooth icon */}
      <View style={styles.iconCircle}>
        <FontAwesome name="spinner" size={48} color="#29A86E" />
      </View>

      {/* Titel */}
      <Text style={styles.sectionTitle}>BESCHIKBARE APPARATEN</Text>

      {/* Beschikbaar apparaat */}
      <TouchableOpacity onPress={() => router.push('/connected-armband')} style={styles.deviceBox}>
        <FontAwesome name="bluetooth-b" size={20} color="#000" style={{ marginRight: 10 }} />
        <View>
          <Text style={styles.deviceName}>Status Armband</Text>
          <Text style={styles.deviceStatus}>Klaar om te verbinden</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    textAlign: 'center',
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(41, 168, 110, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#515151',
    marginBottom: 12,
  },
  deviceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  deviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
  },
  deviceStatus: {
    fontSize: 12,
    color: '#515151',
  },
});

export default VerbindingsStatusScreen;
