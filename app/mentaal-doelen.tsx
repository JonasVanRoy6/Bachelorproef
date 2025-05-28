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

const { width } = Dimensions.get('window');
const CARD_PADDING = 24;
const BAR_WIDTH = width - CARD_PADDING * 2;

const doelen = [
  {
    icon: <FontAwesome5 name="brain" size={20} color="#7061BB" />,
    title: 'Kalme geest',
    progressPerDay: 33.33, // 100% / 3 dagen
    description: 'Je ervaart al minder stress en voelt je rustiger.',
  },
  {
    icon: <Feather name="wind" size={20} color="#7061BB" />,
    title: 'Rustiger leven',
    progressPerDay: 14.29, // 100% / 7 dagen
    description: 'Cravings nemen aanzienlijk af, waardoor je meer controle hebt.',
  },
  {
    icon: <FontAwesome5 name="eye" size={20} color="#7061BB" />,
    title: 'Meer focus',
    progressPerDay: 7.14, // 100% / 14 dagen
    description: 'Je concentratie en geheugen verbeteren merkbaar.',
  },
  {
    icon: <FontAwesome5 name="smile-beam" size={20} color="#7061BB" />,
    title: 'Vrij van zorgen',
    progressPerDay: 4.76, // 100% / 21 dagen
    description: 'Angstgevoelens nemen af, en je ervaart meer mentale stabiliteit.',
  },
  {
    icon: <FontAwesome5 name="user-shield" size={20} color="#7061BB" />,
    title: 'Zelfverzekerd',
    progressPerDay: 3.33, // 100% / 30 dagen
    description: 'Je voelt je sterker en hebt meer controle over je keuzes.',
  },
];

const MentaalDoelen = () => {
  const [progressData, setProgressData] = useState([]);
  const [averageProgress, setAverageProgress] = useState(0); // Houd het gemiddelde bij

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user/progress?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          const createdAt = new Date(data.createdAt);
          const today = new Date();
          const daysSinceCreated = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24)); // Bereken aantal dagen

          // Bereken voortgang voor elk doel
          const updatedProgress = doelen.map((doel) => {
            const progress = Math.min(daysSinceCreated * doel.progressPerDay, 100); // Maximaal 100%
            return { ...doel, progress, progressText: `${Math.round(progress)}%` };
          });

          setProgressData(updatedProgress);

          // Bereken het gemiddelde van alle doelen
          const totalProgress = updatedProgress.reduce((sum, doel) => sum + doel.progress, 0);
          const average = totalProgress / updatedProgress.length;
          setAverageProgress(Math.round(average)); // Rond het gemiddelde af
        } else {
          alert(data.error || 'Fout bij het ophalen van voortgang.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van voortgang:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchProgress();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7061BB" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentaal</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress bar bovenaan */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Gemiddelde voortgang</Text>
          <View style={styles.progressPercentage}>
            <Text style={styles.progressPercentageText}>{averageProgress}%</Text>
          </View>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarForeground, { width: `${averageProgress}%` }]} />
        </View>
      </View>

      {/* Doelen */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {progressData.map((doel, index) => (
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
    backgroundColor: '#7061BB',
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
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
    backgroundColor: '#EAE8F5',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 16,
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
    color: '#7061BB',
  },
  progressPercentage: {
    backgroundColor: 'rgba(112, 97, 187, 0.15)',
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7061BB',
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(112, 97, 187, 0.15)',
    borderRadius: 4,
  },
  progressBarForeground: {
    height: 8,
    backgroundColor: '#7061BB',
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
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  doelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: 'rgba(112, 97, 187, 0.15)',
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
    color: '#7061BB',
  },
  barBackground: {
    height: 8,
    width: BAR_WIDTH,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginBottom: 12,
  },
  barFill: {
    height: 8,
    backgroundColor: '#7061BB',
    borderRadius: 4,
  },
  description: {
    fontSize: 12,
    color: '#515151',
    marginBottom: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#E3E3E3',
  },
});

export default MentaalDoelen;
