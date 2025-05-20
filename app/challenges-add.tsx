import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ICON_OPTIONS = [
  { key: 'reizen', icon: <FontAwesome5 name="suitcase-rolling" size={24} />, color: '#29A86E' },
  { key: 'kleding', icon: <FontAwesome5 name="tshirt" size={24} />, color: '#3ED9E2' },
  { key: 'elektronica', icon: <FontAwesome5 name="mobile-alt" size={24} />, color: '#7061BB' },
  { key: 'cadeau', icon: <FontAwesome name="gift" size={24} />, color: '#FFCD0F' },
  { key: 'voeding', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} />, color: '#FF7373' },
];

const GAP = 8;
const NUM_ICONS = 5;

const ChallengesAdd = () => {
  const [selectedIcon, setSelectedIcon] = useState('reizen');
  const [titel, setTitel] = useState('');
  const [bedrag, setBedrag] = useState('');
  const [containerWidth, setContainerWidth] = useState(0);

  const handleCreate = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }
      if (!titel.trim() || !bedrag.trim()) {
        alert('Vul alle velden in.');
        return;
      }

      const response = await fetch('http://192.168.0.105:5000/challenges/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          icon: selectedIcon,
          title: titel,
          budget: parseFloat(bedrag),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.back();
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

  const iconSize = containerWidth
    ? (containerWidth - (NUM_ICONS - 1) * GAP) / NUM_ICONS
    : 50;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Uitdaging Aanmaken</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <View
          style={styles.iconBoxContainer}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 32)} // remove internal padding
        >
          <Text style={styles.label}>Selecteer Een Icoon</Text>
          <View style={styles.iconRow}>
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
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Naam Uitdaging</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. Vakantie"
            placeholderTextColor="#515151"
            value={titel}
            onChangeText={setTitel}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Budgetdoel</Text>
          <TextInput
            style={styles.input}
            placeholder="€ 100"
            placeholderTextColor="#515151"
            value={bedrag}
            onChangeText={setBedrag}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 72, alignItems: 'center' }}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createText}>Aanmaken</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#252525',
    fontWeight: '500',
    marginBottom: 16,
  },
  iconBoxContainer: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconRow: {
    flexDirection: 'row',
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    height: 53,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#252525',
  },
  createButton: {
    width: 330,
    height: 53,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
});

export default ChallengesAdd;
