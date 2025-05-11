import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  const [activeChallenge, setActiveChallenge] = useState("Vakantie Naar Spanje");

  const challenges = [
    {
      title: "Vakantie Naar Spanje",
      amount: 30,
      goal: 350,
      icon: <FontAwesome5 name="suitcase-rolling" size={16} color="#29A86E" />,
    },
    {
      title: "Nieuwe Trui",
      amount: 40,
      goal: 45,
      icon: <FontAwesome5 name="tshirt" size={16} color="#3ED9E2" />,
    },
  ];

  const handleGoalPress = (route) => {
    router.push(`/${route}`);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.curvedBackground} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../../assets/images/jonas.png")}
            style={styles.profileImage}
          />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.helloText}>Hallo Jelle!</Text>
            <Text style={styles.subText}>Je bent op de goede weg</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => router.push('/settings')}
          >
          <FontAwesome name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakTitle}>Huidige Streak</Text>
            <Text style={styles.streakCount}>16 dagen</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: "rgba(41, 168, 110, 0.15)" }]}>
              <Text style={[styles.statLabel, { color: "#29A86E", textAlign: "center" }]}>Geld{"\n"}Bespaard</Text>
              <Text style={[styles.statValue, { color: "#29A86E", textAlign: "center" }]}>€123</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: "rgba(112, 97, 187, 0.15)" }]}>
              <Text style={[styles.statLabel, { color: "#7061BB", textAlign: "center" }]}>Puffs{"\n"}Vermeden</Text>
              <Text style={[styles.statValue, { color: "#7061BB", textAlign: "center" }]}>97</Text>
            </View>
          </View>
        </View>

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
              style={[styles.goalTab, { backgroundColor: item.color + "26", marginRight: index === 3 ? 0 : 16 }]}
            >
              {item.icon}
              <Text style={[styles.goalText, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mijn Uitdagingen</Text>
            <Text style={styles.viewAll}>Alles bekijken</Text>
          </View>

          {challenges.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.challengeCard, index === 1 ? { marginBottom: 16 } : null]}
              onPress={() => setActiveChallenge(item.title)}
            >
              <View style={styles.challengeHeader}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  {item.icon}
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                </View>
                <Text
                  style={[styles.statusTag, {
                    backgroundColor: activeChallenge === item.title ? "#E6F5EC" : "#EAEAEA",
                    color: activeChallenge === item.title ? "#29A86E" : "#8C8C8C"
                  }]}
                >
                  {activeChallenge === item.title ? "Actief" : "Niet-Actief"}
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBarFg, {
                    width: `${(item.amount / item.goal) * 100}%`,
                    backgroundColor: item.title === "Vakantie Naar Spanje" ? "#29A86E" : "#3ED9E2"
                  }]}
                />
              </View>
              <View style={styles.goalRow}>
                <Text style={styles.goalLabel}>€{item.amount} bespaard</Text>
                <Text style={styles.goalLabel}>Doel: €{item.goal}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff", position: "relative" },
  container: { flex: 1, backgroundColor: "#fff" },
  curvedBackground: {
    height: 240,
    backgroundColor: "#29A86E",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: -230,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  profileImage: { width: 48, height: 48, borderRadius: 24 },
  helloText: { fontSize: 20, fontWeight: "600", color: "#fff" },
  subText: { fontSize: 16, color: "#fff" },
  settingsIcon: { width: 24, height: 24 },
  streakCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 32,
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
    width: 128,
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
