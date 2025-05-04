import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlanScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setModalVisible(true); // Toon de overlay
  };

  const closeModalAndNavigate = () => {
    setModalVisible(false); // Verberg de overlay
    router.push('/successScreen'); // Navigeer naar de "Proficiat"-pagina
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kies jouw traject.</Text>
      <Text style={styles.subtitle}>
        Selecteer een plan dat het beste bij jou past om geleidelijk te stoppen met vapen.
      </Text>

      {/* Geleidelijke Reductie Plan */}
      <View style={[styles.planCard, selectedPlan === 'Geleidelijke Reductie' && styles.planCardSelected]}>
        <Text style={styles.planLabel}>Aanbevolen</Text>
        <Text style={styles.planTitle}>Geleidelijke Reductie</Text>
        <Text style={styles.planDescription}>Verminder met 10 puffs per week</Text>
        <Text style={styles.planFeature}>✔ Beheersbare afname</Text>
        <Text style={styles.planFeature}>✔ Grotere kans op slagen</Text>
        <TouchableOpacity style={styles.planButton} onPress={() => handlePlanSelection('Geleidelijke Reductie')}>
          <Text style={styles.planButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </View>

      {/* Agressieve Reductie Plan */}
      <View style={[styles.planCard, selectedPlan === 'Agressieve Reductie' && styles.planCardSelected]}>
        <Text style={styles.planTitle}>Agressieve Reductie</Text>
        <Text style={styles.planDescription}>Verminder met 50 puffs per week</Text>
        <Text style={styles.planFeature}>⚡ Snellere resultaten</Text>
        <Text style={styles.planFeature}>⚠ Meer uitdagend</Text>
        <TouchableOpacity style={styles.planButton} onPress={() => handlePlanSelection('Agressieve Reductie')}>
          <Text style={styles.planButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPlan}</Text>
            <Text style={styles.modalSubtitle}>Plan Details</Text>
            {selectedPlan === 'Geleidelijke Reductie' && (
              <>
                <Text style={styles.modalFeature}>✔ Verminder met 10 puffs per week</Text>
                <Text style={styles.modalFeature}>✔ Beheersbare afname</Text>
                <Text style={styles.modalFeature}>✔ Grotere kans op slagen</Text>
              </>
            )}
            {selectedPlan === 'Agressieve Reductie' && (
              <>
                <Text style={styles.modalFeature}>⚡ Verminder met 50 puffs per week</Text>
                <Text style={styles.modalFeature}>⚡ Snellere resultaten</Text>
                <Text style={styles.modalFeature}>⚠ Meer uitdagend</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={closeModalAndNavigate}>
              <Text style={styles.modalButtonText}>Ga verder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  modalFeature: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});