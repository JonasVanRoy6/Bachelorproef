import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = SCREEN_WIDTH * 0.06;

const doelenConfig = [
  {
    icon: <FontAwesome5 name="coffee" size={20} color="#29A86E" />,
    title: 'Trakteer jezelf',
    threshold: 5, // €5 gespaard
    description: 'Genoeg gespaard voor een heerlijke kop koffie bij je favoriete café.',
  },
  {
    icon: <Feather name="smile" size={20} color="#29A86E" />,
    title: 'Een avondje uit',
    threshold: 25, // €25 gespaard
    description: 'Een smakelijk diner of een avondje uit met vrienden.',
  },
  {
    icon: <FontAwesome5 name="suitcase" size={20} color="#29A86E" />,
    title: 'Kleine vakantie',
    threshold: 75, // €75 gespaard
    description: 'Je kunt nu een dagtrip of weekendje weg plannen.',
  },
  {
    icon: <FontAwesome5 name="mobile-alt" size={20} color="#29A86E" />,
    title: 'Nieuwe gadget',
    threshold: 150, // €150 gespaard
    description: 'Je hebt genoeg gespaard voor een mooie investering, zoals een gadget of abonnement.',
  },
  {
    icon: <FontAwesome5 name="money-bill-wave" size={20} color="#29A86E" />,
    title: 'Levensverandering',
    threshold: 500, // €500 gespaard
    description: 'Je hebt een aanzienlijk bedrag bespaard, denk aan een vakantie of grote aankoop!',
  },
];

const GeldDoelen = () => {
  const [totalSaved, setTotalSaved] = useState(0); // Totaal gespaard bedrag
  const [doelen, setDoelen] = useState([]);
  const [averageProgress, setAverageProgress] = useState(0); // Gemiddelde voortgang

  useEffect(() => {
    const fetchSavings = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      const response = await fetch(`${API_BASE_URL}/calculate-savings?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setTotalSaved(parseFloat(data.totalSavings)); // Haal het totaal gespaarde bedrag op

        // Bereken voortgang voor elk doel
        const updatedDoelen = doelenConfig.map((doel) => {
          const progress = Math.max(0, Math.min((totalSaved / doel.threshold) * 100, 100));
 // Maximaal 100%
          return {
            ...doel,
            progress,
            progressText: `${Math.round(progress)}%`,
          };
        });

        setDoelen(updatedDoelen);

        // Bereken het gemiddelde van alle doelen
        const totalProgress = updatedDoelen.reduce((sum, doel) => sum + doel.progress, 0);
        const average = totalProgress / updatedDoelen.length;
        setAverageProgress(Math.round(average)); // Rond het gemiddelde af
      } else {
        alert(data.error || 'Fout bij het ophalen van besparingen.');
      }
    };

    fetchSavings();
  }, [totalSaved]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Geld</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress bar bovenaan */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Jouw Progressie</Text>
          <View style={styles.progressPercentage}>
            <Text style={styles.progressPercentageText}>{averageProgress}%</Text>
          </View>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarForeground, { width: `${averageProgress}%` }]} />
        </View>
      </View>

      {/* Doelen */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {doelen.map((doel, index) => (
          <View key={index} style={styles.doelCard}>
            <View style={styles.doelHeader}>
              <View style={styles.iconContainer}>{doel.icon}</View>
              <Text style={styles.doelTitle}>{doel.title}</Text>
              <Text style={styles.percentage}>{doel.progressText}</Text>
            </View>
            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${doel.progress}%` }]} />
            </View>
            <Text style={styles.description}>{doel.description}</Text>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29A86E',
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
    marginBottom: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressCard: {
    backgroundColor: '#DFF2E9',
    borderRadius: 16,
    marginHorizontal: PADDING,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 42,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29A86E',
  },
  progressPercentage: {
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    width: 48,
    height: 28,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#29A86E',
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    borderRadius: 4,
  },
  progressBarForeground: {
    height: 8,
    backgroundColor: '#29A86E',
    borderRadius: 4,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 42,
  },
  doelCard: {
    paddingHorizontal: PADDING,
    marginBottom: 16,
  },
  doelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doelTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#252525',
  },
  percentage: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#29A86E',
  },
  barBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginBottom: 12,
  },
  barFill: {
    height: 8,
    backgroundColor: '#29A86E',
    borderRadius: 4,
  },
  description: {
    fontSize: 12,
    color: '#515151',
    marginBottom: 16,
  },
  divider: {
    height: 0.3,
    backgroundColor: '#E3E3E3',
  },
});

export default GeldDoelen;
