import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BraceletConnectedScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
                  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* Checkmark Icon */}
          <View style={styles.iconCircle}>
            <MaterialIcons name="check" size={40} color="#29A86E" />
          </View>

          {/* Titel */}
          <Text style={styles.title}>Armband Verbonden!</Text>
          <Text style={styles.subtitle}>
            Je armband is succesvol gekoppeld met je apparaat.
          </Text>

          {/* Info Cards */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="information" size={20} color="#29A86E" />
              <Text style={styles.cardTitle}>Belangrijke Mededeling</Text>
            </View>
            <View style={{ height: 12 }} />
            <Text style={styles.cardText}>
              Het verwijderen van de armband beëindigt direct je vape-vrije reeks. Zorg ervoor dat je deze draagt om je voortgang te behouden.
            </Text>
          </View>

          <View style={{ height: 20 }} />

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="hand-front-right" size={20} color="#29A86E" />
              <Text style={styles.cardTitle}>Juiste Plaatsing</Text>
            </View>
            <View style={{ height: 12 }} />
            <Text style={styles.cardText}>
              Draag de armband op de arm die je meestal gebruikt tijdens het vapen. Dit zorgt voor optimale tracking en effectiviteit.
            </Text>
          </View>

          <View style={{ height: 24 }} />
          <View style={styles.divider} />

          {/* Status */}
          <View style={{ height: 12 }} />
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Apparaatstatus</Text>
            <Text style={styles.statusValue}>Verbonden</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Batterijniveau</Text>
            <View style={styles.batteryWrapper}>
              <MaterialIcons name="battery-full" size={18} color="#29A86E" />
              <Text style={styles.statusValue}> 85%</Text>
            </View>
          </View>

          {/* Knop */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/startJourneyScreen')}
          >
            <Text style={styles.buttonText}>Ga verder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#515151',
    lineHeight: 20,
  },
  divider: {
    height: 0.8,
    backgroundColor: '#E3E3E3',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 14,
    color: '#515151',
  },
  statusValue: {
    fontSize: 14,
    color: '#252525',
  },
  batteryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#29A86E',
    borderRadius: 16,
    width: '100%',
    maxWidth: 330,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
});
