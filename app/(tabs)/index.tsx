import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { usePuffs } from "../puffcontext";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
   // Haal de puffs op uit de context
  const maxPuffsPerDay = 80; // Maximale puffs per dag
  const [totalPuffsToday, setTotalPuffsToday] = useState(0); // Houd het totaal aantal puffs van vandaag bij

  // Haal het totaal aantal puffs van vandaag op
  useEffect(() => {
    const fetchTotalPuffsToday = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Haal de user_id op
        console.log(`Ophalen van userId uit AsyncStorage: ${userId}`); // Debugging
        if (!userId) {
          console.error("Gebruiker niet gevonden. Log opnieuw in.");
          return;
        }

        const response = await fetch(`http://192.168.0.105:5000/puffs/today?userId=${userId}`);
        const data = await response.json();
        console.log("Puffs data:", data); // Debugging
        setTotalPuffsToday(data.total_puffs || 0); // Stel het totaal aantal puffs van vandaag in
      } catch (error) {
        console.error("Fout bij het ophalen van het totaal aantal puffs van vandaag:", error);
        setTotalPuffsToday(0); // Stel 0 in bij een fout
      }
    };

    fetchTotalPuffsToday();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hallo, gebruiker</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push("/settings")}
          >
            <Image
              source={require("../../assets/images/instellingen.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>4 dagen</Text>
          <Text style={styles.progressSubtitle}>onder je doel</Text>
          <View style={styles.progressDetails}>
            <Text style={styles.firstText}>
              Puffs vandaag:{" "}
              <Text style={styles.boldText}>
                {totalPuffsToday}/{maxPuffsPerDay}
              </Text>
            </Text>
            <Text style={styles.firstText}>
              Puffs over:{" "}
              <Text style={styles.boldText}>
                {Math.max(0, maxPuffsPerDay - totalPuffsToday)}
              </Text>
            </Text>
            <Text style={styles.firstText}>
              Plan: <Text style={styles.boldText}>10 puffs per week</Text>
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <Text style={styles.sectionTitle}>Mijn voortgang</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statsimagecontainer}>
              <Text style={styles.statTitle}>Gemiddeld</Text>
              <Image source={require("../../assets/images/speed.png")} style={styles.statIcon} />
            </View>
            <Text style={styles.Textgemiddeld}>
              Je zit gemiddeld 35 puffs per dag onder je maximum aantal.
            </Text>
            <Text style={styles.statValue}>45 per dag</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statsimagecontainer}>
              <Text style={styles.statTitle}>Streak</Text>
              <Image source={require("../../assets/images/streak.png")} style={styles.statIcon} />
            </View>
            <Text style={styles.Textgemiddeld}>
              Je zit gemiddeld 35 puffs per dag onder je maximum aantal.
            </Text>
            <Text style={styles.statValue}>13 dagen</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statsimagecontainer}>
              <Text style={styles.statTitle}>Geld bespaard</Text>
              <Image source={require("../../assets/images/money.png")} style={styles.statIcon} />
            </View>
            <Text style={styles.Textgemiddeld}>
              Je zit gemiddeld 35 puffs per dag onder je maximum aantal.
            </Text>
            <Text style={styles.statValue}>€5</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statsimagecontainer}>
              <Text style={styles.statTitle}>Levensvoordeel</Text>
              <Image source={require("../../assets/images/hart.png")} style={styles.statIcon} />
            </View>
            <Text style={styles.Textgemiddeld}>
              Je zit gemiddeld 35 puffs per dag onder je maximum aantal.
            </Text>
            <Text style={styles.statValue}>3 dagen</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#000" },
  settingsButton: { padding: 8 },
  settingsIcon: { width: 24, height: 24 },
  firstText: { color: "white" },
  progressCard: {
    backgroundColor: "#29A86E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  progressTitle: { fontSize: 36, fontWeight: "bold", color: "white" },
  progressSubtitle: { fontSize: 16, color: "white", marginBottom: 10 },
  progressDetails: { marginTop: 10 },
  boldText: { fontWeight: "bold", color: "white" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statsimagecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Textgemiddeld: { fontSize: 13, marginBottom: 20, marginTop: 20 },
  statCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    elevation: 2,
  },
  statTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  statIcon: { width: 20, height: 20, marginBottom: 10 },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
  },
});

export default HomeScreen;
