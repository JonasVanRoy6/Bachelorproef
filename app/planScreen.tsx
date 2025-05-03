import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function PlanScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    Alert.alert('Plan geselecteerd', `Je hebt gekozen voor: ${plan}`);
  };

  return (
    <View style={styles.container}>
      <Link href="/whyScreen" style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </Link>

      <Text style={styles.title}>Kies jouw traject.</Text>
      <Text style={styles.subtitle}>
        Selecteer een plan dat het beste bij jou past om geleidelijk te stoppen met vapen.
      </Text>

      {/* Geleidelijke Reductie Plan */}
      <TouchableOpacity
        style={[
          styles.planCard,
          selectedPlan === 'Geleidelijke Reductie' && styles.planCardSelected,
        ]}
        onPress={() => handlePlanSelection('Geleidelijke Reductie')}
      >
        <Text style={styles.planLabel}>Aanbevolen</Text>
        <Text style={styles.planTitle}>Geleidelijke Reductie</Text>
        <Text style={styles.planDescription}>Verminder met 10 puffs per week</Text>
        <Text style={styles.planFeature}>✔ Beheersbare afname</Text>
        <Text style={styles.planFeature}>✔ Grotere kans op slagen</Text>
        <TouchableOpacity style={styles.planButton}>
          <Text style={styles.planButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Agressieve Reductie Plan */}
      <TouchableOpacity
        style={[
          styles.planCard,
          selectedPlan === 'Agressieve Reductie' && styles.planCardSelected,
        ]}
        onPress={() => handlePlanSelection('Agressieve Reductie')}
      >
        <Text style={styles.planTitle}>Agressieve Reductie</Text>
        <Text style={styles.planDescription}>Verminder met 50 puffs per week</Text>
        <Text style={styles.planFeature}>⚡ Snellere resultaten</Text>
        <Text style={styles.planFeature}>⚠ Meer uitdagend</Text>
        <TouchableOpacity style={styles.planButton}>
          <Text style={styles.planButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Later beslissen */}
      <Link href="/tabs/index" style={styles.laterLink}>
        <Text style={styles.laterText}>Later beslissen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  planCard: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  planCardSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#E6F4EA',
  },
  planLabel: {
    fontSize: 12,
    color: '#00A86B',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  planDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  planFeature: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  planButton: {
    backgroundColor: '#333333',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  laterLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  laterText: {
    fontSize: 14,
    color: '#00A86B',
    textAlign: 'center',
  },
});