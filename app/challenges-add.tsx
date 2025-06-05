import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const ICON_OPTIONS = [
  { key: 'reizen', icon: <FontAwesome5 name="suitcase-rolling" size={24} />, color: '#29A86E' },
  { key: 'kleding', icon: <FontAwesome5 name="tshirt" size={24} />, color: '#3ED9E2' },
  { key: 'elektronica', icon: <FontAwesome5 name="mobile-alt" size={24} />, color: '#7061BB' },
  { key: 'cadeau', icon: <FontAwesome name="gift" size={24} />, color: '#FFCD0F' },
  { key: 'voeding', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} />, color: '#FF7373' },
];

const GAP = 8;

const ChallengesAdd = () => {
  const { width: screenWidth } = useWindowDimensions();
  const iconContainerWidth = screenWidth - 48;
  const iconSize = (iconContainerWidth - (ICON_OPTIONS.length - 1) * GAP) / ICON_OPTIONS.length;

  const [selectedIcon, setSelectedIcon] = useState('reizen');
  const [titel, setTitel] = useState('');
  const [bedrag, setBedrag] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCreate = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
      if (!titel.trim() || !bedrag.trim()) return alert('Vul alle velden in.');

      const response = await fetch(`${API_BASE_URL}/challenges/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          icon: selectedIcon,
          title: titel,
          budget: parseFloat(bedrag),
          isActive,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccessPopup(true);
      } else {
        alert(data.error || 'Er is iets misgegaan bij het aanmaken van de uitdaging.');
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van de uitdaging:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const getOpacityColor = (hex: string, percent: number = 15) => {
    const opacityHex = Math.round((percent / 100) * 255).toString(16).padStart(2, '0');
    return hex + opacityHex;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="arrow-left" size={24} color="#29A86E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Uitdaging Aanmaken</Text>
            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.label}>Selecteer Een Icoon</Text>
          <View style={[styles.iconRowContainer, { width: iconContainerWidth }]}>
            {ICON_OPTIONS.map(({ key, icon, color }, index) => {
              const isSelected = selectedIcon === key;
              const isLast = index === ICON_OPTIONS.length - 1;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedIcon(key)}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: iconSize / 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: isLast ? 0 : GAP,
                    backgroundColor: getOpacityColor(color),
                    borderWidth: 1.5,
                    borderColor: isSelected ? color : 'transparent',
                    opacity: isSelected ? 1 : 0.6,
                  }}
                >
                  {React.cloneElement(icon, { color })}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Naam Uitdaging</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. Vakantie"
            placeholderTextColor="#515151"
            value={titel}
            onChangeText={setTitel}
          />

          <Text style={styles.label}>Budgetdoel</Text>
          <TextInput
            style={styles.input}
            placeholder="€ 100"
            placeholderTextColor="#515151"
            value={`€ ${bedrag}`}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9.]/g, '');
              setBedrag(numericText);
            }}
            keyboardType="decimal-pad"
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => setIsActive(!isActive)}
              style={[
                styles.checkbox,
                { backgroundColor: isActive ? '#29A86E' : '#fff' },
              ]}
            >
              {isActive && <FontAwesome name="check" size={16} color="#fff" />}
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#252525' }}>
              Als actief instellen?
            </Text>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createText}>Aanmaken</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showSuccessPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Image
              source={require('../assets/images/ImageChallengeCreated.png')}
              style={styles.popupImage}
              resizeMode="contain"
            />
            <Text style={styles.popupTitle}>Uitdaging Aangemaakt</Text>
            <Text style={styles.popupText}>
              Je hebt met succes een nieuwe uitdaging toegevoegd. Veel succes!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccessPopup(false);
                router.back();
              }}
              style={styles.popupButton}
            >
              <Text style={styles.popupButtonText}>Doorgaan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    paddingTop: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },
  label: {
    fontSize: 16,
    color: '#252525',
    fontWeight: '500',
    marginBottom: 16,
    marginTop: 16,
  },
  iconRowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    height: 53,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#252525',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  createButton: {
    height: 53,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  createText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  popupImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 16,
    color: '#515151',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  popupButton: {
    backgroundColor: '#29A86E',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
  },
  popupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChallengesAdd;
