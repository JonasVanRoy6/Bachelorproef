import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import API_BASE_URL from '../../server/config';

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

const AddPuffsScreen = () => {
  const [duration, setDuration] = useState(120);
  const [intensity, setIntensity] = useState("Gemiddeld");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [estimatedPuffs, setEstimatedPuffs] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    calculatePuffs();
  }, [duration, intensity]);

  const calculatePuffs = () => {
    let basePuffs = duration / 2;
    if (intensity === "Weinig") basePuffs *= 0.5;
    if (intensity === "Veel") basePuffs *= 1.5;
    setEstimatedPuffs(Math.round(basePuffs));
  };

  const handleSave = async () => {
    if (estimatedPuffs > 0 && timeOfDay) {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          Alert.alert("Fout", "Gebruiker niet gevonden. Log opnieuw in.");
          return;
        }

        const payload = { userId, puffs: estimatedPuffs, timeOfDay };

        const response = await fetch(`${API_BASE_URL}/puffs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Fout bij het verzenden");

        setShowPopup(true); // ✅ Show popup
      } catch (error) {
        console.error("Fout bij opslaan puffs:", error);
        Alert.alert("Fout", "Er is iets misgegaan bij het opslaan.");
      }
    } else {
      Alert.alert("Ongeldig", "Vul alles correct in.");
    }
  };

  const timeOptions = [
    { label: "Ochtend (6:00 - 12:00)", icon: "weather-sunset" },
    { label: "Middag (12:00 - 18:00)", icon: "white-balance-sunny" },
    { label: "Avond (18:00 - 00:00)", icon: "weather-night-partly-cloudy" },
    { label: "Nacht (00:00 - 6:00)", icon: "weather-night" },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 64 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/tracker")} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Puffs Toevoegen</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ height: 12 }} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hoe lang heb je gevaped?</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={240}
            step={1}
            value={duration}
            onSlidingComplete={setDuration}
            minimumTrackTintColor="#29A86E"
            maximumTrackTintColor="rgba(41, 168, 110, 0.30)"
            thumbTintColor="#29A86E"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>1 min</Text>
            <Text style={styles.sliderLabel}>120 min</Text>
            <Text style={styles.sliderLabel}>240 min</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vape-intensiteit</Text>
          <View style={styles.intensityRow}>
            {["Weinig", "Gemiddeld", "Veel"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.intensityButton, intensity === level && styles.selected]}
                onPress={() => setIntensity(level)}
              >
                <Text style={[styles.intensityText, intensity === level && styles.selectedText]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wanneer heb je het meest gevaped?</Text>
          <View style={styles.timeGrid}>
            {timeOptions.map(({ label, icon }) => (
              <TouchableOpacity
                key={label}
                style={[styles.timeCard, timeOfDay === label && styles.selected]}
                onPress={() => setTimeOfDay(label)}
              >
                <MaterialCommunityIcons
                  name={icon}
                  size={24}
                  color={timeOfDay === label ? "#29A86E" : "#515151"}
                  style={{ marginBottom: 4 }}
                />
                <Text style={[styles.timeText, timeOfDay === label && styles.selectedText]}>
                  {label.split(" ")[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Geschatte aantal puffs:</Text>
          <Text style={styles.estimatedValue}>{estimatedPuffs}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Opslaan</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ POPUP */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Image
              source={require('../../assets/images/ImagePuffsAdded.png')}
              style={styles.popupImage}
              resizeMode="contain"
            />
            <Text style={styles.popupTitle}>Puffs Toegevoegd!</Text>
            <Text style={styles.popupText}>Je puffs zijn succesvol geregistreerd!</Text>
            <TouchableOpacity
              onPress={() => {
                setShowPopup(false);
                router.push('/(tabs)/tracker');
              }}
              style={styles.popupButton}
            >
              <Text style={styles.popupButtonText}>Doorgaan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#252525",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 0.8,
    borderColor: "#E3E3E3",
  },
  cardSmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#E3E3E3",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#252525",
    marginBottom: 12,
  },
  slider: {
    width: CARD_WIDTH - 32,
    height: 36,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabel: {
    fontSize: 14,
    color: "#515151",
  },
  intensityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  intensityButton: {
    width: (CARD_WIDTH - 32 - 18) / 3,
    height: 50,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: "#E3E3E3",
    justifyContent: "center",
    alignItems: "center",
  },
  intensityText: {
    fontSize: 14,
    color: "#515151",
  },
  selected: {
    backgroundColor: "rgba(41, 168, 110, 0.15)",
    borderColor: "#29A86E",
  },
  selectedText: {
    color: "#29A86E",
    fontWeight: "600",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  timeCard: {
    width: (CARD_WIDTH - 32 - 4) / 2,
    height: 80,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: "#E3E3E3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#515151",
  },
  estimatedValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#29A86E",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#29A86E",
    borderRadius: 16,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
  },
  saveButtonText: {
    color: "#F5F5F5",
    fontSize: 18,
    fontWeight: "600",
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

export default AddPuffsScreen;
