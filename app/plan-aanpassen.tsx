import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PlanAanpassenScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('geleidelijk');

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
        <TouchableOpacity style={styles.blackButton} onPress={() => setSelectedPlan('geleidelijk')}>
          <Text style={styles.buttonText}>Kies dit plan</Text>
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
            styles.whiteButton,
            selectedPlan === 'agressief' && styles.whiteButtonSelected,
          ]}
          onPress={() => setSelectedPlan('agressief')}
        >
          <Text style={styles.whiteButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </View>

      {/* Opslaan knop */}
      <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/settings')}>
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
