import React from 'react';
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

const { width } = Dimensions.get('window');
const CARD_PADDING = 24;
const BAR_WIDTH = width - CARD_PADDING * 2;

const doelen = [
  {
    icon: <FontAwesome5 name="brain" size={20} color="#7061BB" />,
    title: 'Kalme geest',
    progress: 0.28,
    progressText: '28%',
    description: 'Je ervaart al minder stress en voelt je rustiger.',
  },
  {
    icon: <Feather name="wind" size={20} color="#7061BB" />,
    title: 'Rustiger leven',
    progress: 0.08,
    progressText: '8%',
    description: 'Cravings nemen aanzienlijk af, waardoor je meer controle hebt.',
  },
  {
    icon: <FontAwesome5 name="eye" size={20} color="#7061BB" />,
    title: 'Meer focus',
    progress: 0.02,
    progressText: '2%',
    description: 'Je concentratie en geheugen verbeteren merkbaar.',
  },
  {
    icon: <FontAwesome5 name="smile-beam" size={20} color="#7061BB" />,
    title: 'Vrij van zorgen',
    progress: 0.006,
    progressText: '0.6%',
    description: 'Angstgevoelens nemen af, en je ervaart meer mentale stabiliteit.',
  },
  {
    icon: <FontAwesome5 name="user-shield" size={20} color="#7061BB" />,
    title: 'Zelfverzekerd',
    progress: 0.0016,
    progressText: '0.16%',
    description: 'Je voelt je sterker en hebt meer controle over je keuzes.',
  },
];

const MentaalDoelen = () => {
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

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Jouw Progressie</Text>
          <View style={styles.progressPercentage}>
            <Text style={styles.progressPercentageText}>25%</Text>
          </View>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarForeground, { width: '25%' }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {doelen.map((doel, index) => (
          <View key={index} style={styles.doelCard}>
            <View style={styles.doelHeader}>
              <View style={styles.iconContainer}>{doel.icon}</View>
              <Text style={styles.doelTitle}>{doel.title}</Text>
              <Text style={styles.percentage}>{doel.progressText}</Text>
            </View>
            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${doel.progress * 100}%` }]} />
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
