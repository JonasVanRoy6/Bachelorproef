import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ICON_OPTIONS = [
  { key: 'reizen', icon: <FontAwesome5 name="suitcase-rolling" size={28} />, color: '#29A86E' },
  { key: 'kleding', icon: <FontAwesome5 name="tshirt" size={28} />, color: '#3ED9E2' },
  { key: 'elektronica', icon: <FontAwesome5 name="mobile-alt" size={28} />, color: '#7061BB' },
  { key: 'cadeau', icon: <FontAwesome name="gift" size={28} />, color: '#FFCD0F' },
  { key: 'voeding', icon: <MaterialCommunityIcons name="silverware-fork-knife" size={28} />, color: '#FF7373' },
];

const ChallengesAdd = () => {
  const [selectedIcon, setSelectedIcon] = useState('reizen');
  const [titel, setTitel] = useState('');
  const [bedrag, setBedrag] = useState('');

  const handleCreate = () => {
    // Later back-end toevoegen, nu gewoon terug
    router.back();
  };

  const getOpacityColor = (hex: string, percent: number = 15) => {
    const opacityHex = Math.round((percent / 100) * 255).toString(16).padStart(2, '0');
    return hex + opacityHex;
  };

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
        <View style={styles.iconBoxContainer}>
          <Text style={styles.label}>Selecteer Een Icoon</Text>
          <View style={styles.iconRow}>
            {ICON_OPTIONS.map(({ key, icon, color }) => {
              const isSelected = selectedIcon === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedIcon(key)}
                  style={[
                    styles.iconChoice,
                    {
                      backgroundColor: getOpacityColor(color),
                      borderColor: isSelected ? color : 'transparent',
                      opacity: isSelected ? 1 : 0.6,
                    },
                  ]}
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
    width: 370,
    height: 140,
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
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
    gap: 12,
  },
  iconChoice: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  inputBox: {
    width: 370,
    height: 137,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16, // Gelijke top/bottom
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    width: 306,
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
