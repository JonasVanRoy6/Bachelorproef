import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  FontAwesome5,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../server/config";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ICONS = {
  reizen: <FontAwesome5 name="suitcase-rolling" size={24} color="#29A86E" />,
  kleding: <FontAwesome5 name="tshirt" size={24} color="#3ED9E2" />,
  voeding: (
    <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#FF7373" />
  ),
  elektronica: <FontAwesome5 name="mobile-alt" size={24} color="#7061BB" />,
  cadeau: <FontAwesome name="gift" size={24} color="#FFCD0F" />,
} as const;

const kleuren = {
  reizen: "#29A86E",
  kleding: "#3ED9E2",
  voeding: "#FF7373",
  elektronica: "#7061BB",
  cadeau: "#FFCD0F",
};

const HomeScreen = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [userName, setUserName] = useState("");
  const [totalSaved, setTotalSaved] = useState(0);
  const [puffsAvoided, setPuffsAvoided] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      const response = await fetch(`${API_BASE_URL}/challenges?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setActiveChallenge(data[0]);
        setChallenges(data);
      }
    };
    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      const response = await fetch(`${API_BASE_URL}/user-data?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUserName(data.firstName);
        setProfilePicture(data.profilePicture || "https://via.placeholder.com/48");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSavings = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const response = await fetch(`${API_BASE_URL}/calculate-savings?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setTotalSaved(data.totalSavings); // Geld bespaard
        setPuffsAvoided(data.puffsAvoided); // Puffs vermeden
      } else {
        alert(data.error || "Fout bij het ophalen van besparingen.");
      }
    };

    fetchSavings();
  }, []);

  const handleGoalPress = (route) => {
    router.push(`/${route}`);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <View style={styles.curvedBackground} />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.helloText}>Hallo {userName}!</Text>
            <Text style={styles.subText}>Je bent op de goede weg</Text>
          </View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push("/settings")}>
            <FontAwesome name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Streak Card op juiste hoogte */}
        <View style={styles.streakCardContainer}>
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <Text style={styles.streakTitle}>Huidige Streak</Text>
              <Text style={styles.streakCount}>16 dagen</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={[styles.statBox, { backgroundColor: "rgba(41, 168, 110, 0.15)" }]}>
                <Text style={[styles.statLabel, { color: "#29A86E", textAlign: "center" }]}>
                  Geld{"\n"}Bespaard
                </Text>
                <Text style={[styles.statValue, { color: "#29A86E", textAlign: "center" }]}>
                  €{totalSaved}
                </Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: "rgba(112, 97, 187, 0.15)" }]}>
                <Text style={[styles.statLabel, { color: "#7061BB", textAlign: "center" }]}>
                  Puffs{"\n"}Vermeden
                </Text>
                <Text style={[styles.statValue, { color: "#7061BB", textAlign: "center" }]}>
                  {puffsAvoided}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content met border radius */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Mijn Doelen</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 32 }}
            style={{ marginTop: 16 }}
          >
            {[
              { label: "Gezondheid", icon: <Feather name="heart" size={24} color="#29A86E" />, color: "#29A86E", route: "gezondheid-doelen" },
              { label: "Mentaal", icon: <MaterialIcons name="psychology" size={24} color="#7061BB" />, color: "#7061BB", route: "mentaal-doelen" },
              { label: "Duurzaamheid", icon: <Feather name="sun" size={24} color="#3ED9E2" />, color: "#3ED9E2", route: "duurzaamheid-doelen" },
              { label: "Geld", icon: <FontAwesome5 name="piggy-bank" size={24} color="#29A86E" />, color: "#29A86E", route: "geld-doelen" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleGoalPress(item.route)}
                style={[
                  styles.goalTab,
                  {
                    backgroundColor: item.color + "26",
                    marginRight: index === 3 ? 0 : 16,
                    width: SCREEN_WIDTH * 0.32,
                  },
                ]}
              >
                {item.icon}
                <Text style={[styles.goalText, { color: item.color }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ marginTop: 24 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mijn Uitdagingen</Text>
              <TouchableOpacity onPress={() => router.push("/challenges")}>
                <Text style={styles.viewAll}>Alles bekijken</Text>
              </TouchableOpacity>
            </View>

            {challenges.map((item, index) => (
              <View
                key={item.challenge_id}
                style={[styles.challengeCard, index === 1 ? { marginBottom: 16 } : null]}
              >
                <View style={styles.challengeHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    {ICONS[item.thema] || <FontAwesome name="question" size={24} color="#29A86E" />}
                    <Text style={styles.challengeTitle}>{item.titel}</Text>
                  </View>
                  <Text
                    style={[
                      styles.statusTag,
                      {
                        backgroundColor: activeChallenge?.challenge_id === item.challenge_id ? "#E6F5EC" : "#EAEAEA",
                        color: activeChallenge?.challenge_id === item.challenge_id ? "#29A86E" : "#8C8C8C",
                      },
                    ]}
                  >
                    {activeChallenge?.challenge_id === item.challenge_id ? "Actief" : "Niet-Actief"}
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFg,
                      {
                        width: `${(item.huidig / (item.bedrag * 100)) * 100}%`,
                        backgroundColor: kleuren[item.thema] || "#29A86E",
                      },
                    ]}
                  />
                </View>
                <View style={styles.goalRow}>
                  <Text style={styles.goalLabel}>€{totalSaved} gespaard</Text>
                  <Text style={styles.goalLabel}>Doel: €{item.bedrag}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff" },
  curvedBackground: {
    height: 360, // verhoogd van 240 naar 360
    backgroundColor: "#29A86E",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
},

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  profileImage: { width: 48, height: 48, borderRadius: 24 },
  helloText: { fontSize: 20, fontWeight: "600", color: "#fff" },
  subText: { fontSize: 16, color: "#fff" },
  settingsIcon: { width: 24, height: 24 },
  streakCardContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  streakCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 98,
    marginTop: -84,
  },
  streakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  streakTitle: { fontSize: 16, fontWeight: "bold", color: "#252525" },
  streakCount: { fontSize: 24, fontWeight: "bold", color: "#29A86E" },
  statsRow: { flexDirection: "row", gap: 12 },
  statBox: {
    flex: 1,
    height: 96,
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
  },
  statLabel: { fontSize: 14 },
  statValue: { fontSize: 20, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#252525",
    paddingHorizontal: 16,
  },
  goalTab: {
    height: 76,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  goalText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  viewAll: { fontSize: 14, color: "#29A86E" },
  challengeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeTitle: { fontSize: 16, fontWeight: "600", color: "#252525" },
  statusTag: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  progressBarBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginTop: 22,
  },
  progressBarFg: { height: 8, borderRadius: 4 },
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  goalLabel: { fontSize: 14, color: "#252525" },
});

export default HomeScreen;
