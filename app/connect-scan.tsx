// app/connect-scan.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const ConnectScanScreen = () => {
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

      {/* Zoeken */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconBackground}>
          <FontAwesome name="ellipsis-h" size={32} color="#29A86E" />
        </View>
      </View>

      <Text style={styles.title}>Zoeken naar armband</Text>
      <Text style={styles.subtitle}>
        Zorg ervoor dat je armband in de buurt is en Bluetooth is ingeschakeld.
      </Text>

      {/* Apparatenlijst */}
      <Text style={styles.sectionLabel}>BESCHIKBARE APPARATEN</Text>
      <TouchableOpacity onPress={() => router.push('/verbindingsstatus')} style={styles.deviceCard}>
        <FontAwesome name="plug" size={20} color="#29A86E" />
        <View style={styles.deviceText}>
          <Text style={styles.deviceTitle}>Status Armband</Text>
          <Text style={styles.deviceSubtitle}>Klaar om te verbinden</Text>
        </View>
        <FontAwesome name="chevron-right" size={14} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    paddingHorizontal: 20,
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
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 32,
    fontFamily: 'Poppins',
  },
  sectionLabel: {
    fontSize: 13,
    color: '#515151',
    marginBottom: 12,
    fontFamily: 'Poppins',
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
  },
  deviceText: {
    flex: 1,
    marginLeft: 12,
  },
  deviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    fontFamily: 'Poppins',
  },
  deviceSubtitle: {
    fontSize: 13,
    color: '#515151',
    fontFamily: 'Poppins',
  },
});

export default ConnectScanScreen;
