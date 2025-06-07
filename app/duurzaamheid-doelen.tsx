import React, { useState, useEffect } from 'react';
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

 // Replace with your actual API base URL

const DuurzaamheidDoelen = () => {
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

          // Doelen met dynamische voortgang
          const doelen = [
            {
              icon: <Feather name="trash-2" size={20} color="#3ED9E2" />,
              title: 'Kleine Impact',
              progressPerDay: 50, // 100% / 2 dagen
              description: 'Je hebt al een bijdrage geleverd door minder vape-afval te produceren.',
            },
            {
              icon: <FontAwesome5 name="recycle" size={20} color="#3ED9E2" />,
              title: 'Schonere omgeving',
              progressPerDay: 20, // 100% / 5 dagen
              description: 'Je voorkomt dat schadelijke stoffen in de natuur belanden.',
            },
            {
              icon: <Feather name="shopping-bag" size={20} color="#3ED9E2" />,
              title: 'Duurzame keuze',
              progressPerDay: 10, // 100% / 10 dagen
              description: 'Je helpt de vraag naar wegwerp-vapes en nicotineproducten te verminderen.',
            },
            {
              icon: <Feather name="wind" size={20} color="#3ED9E2" />,
              title: 'Frisse lucht',
              progressPerDay: 5, // 100% / 20 dagen
              description: 'Je vermindert luchtvervuiling door minder uitstoot en afval.',
            },
            {
              icon: <FontAwesome5 name="globe" size={20} color="#3ED9E2" />,
              title: 'Groene toekomst',
              progressPerDay: 2.5, // 100% / 40 dagen
              description: 'Je draagt bij aan een schonere, duurzamere planeet.',
            },
          ];

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
      <StatusBar backgroundColor="#3ED9E2" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Duurzaamheid</Text>
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
    backgroundColor: '#3ED9E2',
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
    backgroundColor: '#E2FAFB',
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
    color: '#3ED9E2',
  },
  progressPercentage: {
    backgroundColor: 'rgba(62, 217, 226, 0.15)',
    width: 48,
    height: 28,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3ED9E2',
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(62, 217, 226, 0.15)',
    borderRadius: 4,
  },
  progressBarForeground: {
    height: 8,
    backgroundColor: '#3ED9E2',
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
    backgroundColor: 'rgba(62, 217, 226, 0.15)',
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
    color: '#3ED9E2',
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
    backgroundColor: '#3ED9E2',
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

export default DuurzaamheidDoelen;
