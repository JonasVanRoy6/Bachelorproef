import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlanAanpassenScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [activePlan, setActivePlan] = useState('');

  // Haal het actieve plan op bij het laden van de pagina
  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('Gebruiker niet gevonden. Log opnieuw in.');
          return;
        }

        const response = await fetch(`http://192.168.0.105:5000/user/active-plan?userId=${userId}`);
        const data = await response.json();
        setActivePlan(data.plan); // Stel het actieve plan in
        setSelectedPlan(data.plan); // Stel het geselecteerde plan in
      } catch (error) {
        console.error('Fout bij het ophalen van het actieve plan:', error);
      }
    };

    fetchActivePlan();
  }, []);

  // Functie om het plan bij te werken
  const updatePlan = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('Verstuurde gegevens:', { userId, plan: selectedPlan });

      if (!userId) {
        console.error('Gebruiker niet gevonden. Log opnieuw in.');
        return;
      }

      const response = await fetch('http://192.168.0.105:5000/user/update-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, plan: selectedPlan }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        Alert.alert('Succes', 'Plan succesvol bijgewerkt!');
        setActivePlan(selectedPlan); // Werk het actieve plan bij
      } else {
        const errorData = await response.json();
        console.error('Foutmelding van server:', errorData);
        Alert.alert('Fout', 'Er is een probleem opgetreden bij het bijwerken van het plan.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van het plan:', error);
      Alert.alert('Fout', 'Kan geen verbinding maken met de server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan Aanpassen</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Plan 1: Geleidelijke reductie */}
      <View style={[styles.planBox, selectedPlan === 'geleidelijk' && styles.selectedBox]}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Aanbevolen</Text>
        </View>
        <Text style={styles.planTitle}>Geleidelijke Reductie</Text>
        <Text style={styles.planSubtitle}>Verminder met 10 puffs per week</Text>
        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <FontAwesome name="check" size={20} color="#29A86E" />
            <Text style={styles.benefitText}>Beheersbare afname</Text>
          </View>
          <View style={styles.benefitItem}>
            <FontAwesome name="check" size={20} color="#29A86E" />
            <Text style={styles.benefitText}>Grotere kans op slagen</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.blackButton,
            activePlan === 'geleidelijk' && styles.whiteButton, // Actieve knop krijgt witte stijl
          ]}
          onPress={() => setSelectedPlan('geleidelijk')}
          disabled={activePlan === 'geleidelijk'} // Knop is uitgeschakeld als het plan actief is
        >
          <Text
            style={[
              styles.buttonText,
              activePlan === 'geleidelijk' && styles.whiteButtonText, // Tekststijl voor actieve knop
            ]}
          >
            {activePlan === 'geleidelijk' ? 'Actief Plan' : 'Kies dit plan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Plan 2: Agressieve reductie */}
      <View style={[styles.planBox, selectedPlan === 'agressief' && styles.selectedBox]}>
        <Text style={styles.planTitle}>Agressieve Reductie</Text>
        <Text style={styles.planSubtitle}>Verminder met 50 puffs per week</Text>
        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <FontAwesome name="bolt" size={20} color="#29A86E" />
            <Text style={styles.benefitText}>Snellere resultaten</Text>
          </View>
          <View style={styles.benefitItem}>
            <FontAwesome name="exclamation-triangle" size={20} color="#29A86E" />
            <Text style={styles.benefitText}>Meer uitdagend</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.blackButton,
            activePlan === 'agressief' && styles.whiteButton, // Actieve knop krijgt witte stijl
          ]}
          onPress={() => setSelectedPlan('agressief')}
          disabled={activePlan === 'agressief'} // Knop is uitgeschakeld als het plan actief is
        >
          <Text
            style={[
              styles.buttonText,
              activePlan === 'agressief' && styles.whiteButtonText, // Tekststijl voor actieve knop
            ]}
          >
            {activePlan === 'agressief' ? 'Actief Plan' : 'Kies dit plan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Opslaan knop */}
      <TouchableOpacity style={styles.saveButton} onPress={updatePlan}>
        <Text style={styles.saveButtonText}>Wijzigingen opslaan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    textAlign: 'center',
  },

  planBox: {
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  selectedBox: {
    borderColor: '#29A86E',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#29A86E',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 16,
    color: '#515151',
    marginBottom: 16,
  },
  benefits: {
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 16,
    color: '#252525',
    marginLeft: 10,
  },

  blackButton: {
    backgroundColor: '#252525',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  whiteButton: {
    backgroundColor: '#fff',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  whiteButtonSelected: {
    borderColor: '#252525',
  },
  whiteButtonText: {
    color: '#252525',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
