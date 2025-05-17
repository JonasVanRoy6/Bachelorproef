import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const ConnectArmbandScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verbinding Armband</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <FontAwesome name="circle" size={80} color="#29A86E" />
        </View>
        <Text style={styles.title}>Verbind je armband</Text>
        <Text style={styles.subtitle}>
          Zorg ervoor dat je armband in de buurt is en aan staat.
        </Text>
      </View>

      {/* Scan button */}
      <TouchableOpacity onPress={() => router.push('/connect-scan')} style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Apparaten Scannen</Text>
      </TouchableOpacity>

      {/* Info card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <FontAwesome name="info-circle" size={18} color="#29A86E" />
          <Text style={styles.infoTextBold}> Zet je bluetooth op</Text>
        </View>
        <Text style={styles.infoText}>
          Houd de knop op uw armband 3 seconden ingedrukt
        </Text>
        <Text style={styles.infoText}>
          Druk op “Apparaten Scannen” wanneer het lampje begint te knipperen
        </Text>
      </View>
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
    marginBottom: 32,
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
    fontFamily: 'Poppins',
    color: '#252525',
    textAlign: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 128,
    height: 128,
    backgroundColor: '#E8F5EF',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 4,
    color: '#252525',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#515151',
  },
  scanButton: {
    backgroundColor: '#29A86E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  scanButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  infoCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTextBold: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#252525',
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: '#252525',
    marginBottom: 4,
  },
});

export default ConnectArmbandScreen;
