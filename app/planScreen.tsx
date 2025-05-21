import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PlanScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (!id) {
        Alert.alert('Fout', 'Gebruiker niet gevonden. Log opnieuw in.');
        router.push('/login');
        return;
      }
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const openModal = (plan: string) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSaveAndContinue = async () => {
    if (!userId || !selectedPlan) return;

    try {
      const response = await fetch('http://192.168.0.105:5000/saveGoal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          plan: selectedPlan,
        }),
      });

      if (!response.ok) throw new Error();

      setShowModal(false);
      router.push('/successScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Fout', 'Er is een fout opgetreden bij het opslaan van je plan.');
    }
  };

  const handleLater = () => {
    router.push('/home');
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/usageScreen')}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Kies jouw traject.</Text>
      <Text style={styles.subtitle}>
        Selecteer een plan dat het beste bij jou past om geleidelijk te stoppen met vapen.
      </Text>

      {/* Geleidelijke reductie */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.recommendedBadge}>Aanbevolen</Text>
          <FontAwesome name="star" size={20} color="#29A86E" />
        </View>
        <Text style={styles.planTitle}>Geleidelijke Reductie</Text>
        <Text style={styles.planDesc}>Verminder met 10 puffs per week</Text>
        <View style={styles.benefitRow}>
          <FontAwesome name="check" size={16} color="#29A86E" />
          <Text style={styles.benefitText}>Beheersbare afname</Text>
        </View>
        <View style={styles.benefitRow}>
          <FontAwesome name="check" size={16} color="#29A86E" />
          <Text style={styles.benefitText}>Grotere kans op slagen</Text>
        </View>
        <TouchableOpacity
          style={styles.blackButton}
          onPress={() => openModal('geleidelijk')}
        >
          <Text style={styles.blackButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </View>

      {/* Agressieve reductie */}
      <View style={styles.card}>
        <Text style={styles.planTitle}>Agressieve Reductie</Text>
        <Text style={styles.planDesc}>Verminder met 50 puffs per week</Text>
        <View style={styles.benefitRow}>
          <Feather name="zap" size={16} color="#29A86E" />
          <Text style={styles.benefitText}>Snellere resultaten</Text>
        </View>
        <View style={styles.benefitRow}>
          <FontAwesome name="exclamation-triangle" size={16} color="#29A86E" />
          <Text style={styles.benefitText}>Meer uitdagend</Text>
        </View>
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => openModal('agressief')}
        >
          <Text style={styles.whiteButtonText}>Kies dit plan</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLater}>
        <Text style={styles.laterText}>Later beslissen</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedPlan === 'geleidelijk'
                  ? 'Geleidelijke Reductie'
                  : 'Agressieve Reductie'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <FontAwesome name="close" size={24} color="#252525" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBox}>
              <Text style={styles.planDesc}>
                {selectedPlan === 'geleidelijk'
                  ? 'Verminder met 10 puffs per week'
                  : 'Verminder met 50 puffs per week'}
              </Text>

              <View style={styles.benefitRow}>
                <FontAwesome name="check" size={16} color="#29A86E" />
                <Text style={styles.benefitText}>
                  {selectedPlan === 'geleidelijk'
                    ? 'Beheersbare afname'
                    : 'Snellere resultaten'}
                </Text>
              </View>

              <View style={styles.benefitRow}>
                <FontAwesome name="check" size={16} color="#29A86E" />
                <Text style={styles.benefitText}>
                  {selectedPlan === 'geleidelijk'
                    ? 'Grotere kans op slagen'
                    : 'Meer uitdagend'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.modalButtonText}>Ga verder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#515151',
    marginBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recommendedBadge: {
    backgroundColor: '#E6F4EA',
    color: '#29A86E',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 4,
  },
  planDesc: {
    fontSize: 14,
    color: '#515151',
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#252525',
  },
  blackButton: {
    marginTop: 12,
    backgroundColor: '#252525',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  whiteButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteButtonText: {
    color: '#252525',
    fontWeight: '600',
    fontSize: 16,
  },
  laterText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#29A86E',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252525',
  },
  modalBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#29A86E',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
