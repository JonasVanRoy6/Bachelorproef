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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = SCREEN_WIDTH * 0.06;

const doelen = [
  {
    icon: <FontAwesome5 name="coffee" size={20} color="#29A86E" />,
    title: 'Trakteer jezelf',
    progress: 0.28,
    progressText: '28%',
    description: 'Genoeg gespaard voor een heerlijke kop koffie bij je favoriete café.',
  },
  {
    icon: <Feather name="smile" size={20} color="#29A86E" />,
    title: 'Een avondje uit',
    progress: 0.08,
    progressText: '8%',
    description: 'Een smakelijk diner of een avondje uit met vrienden.',
  },
  {
    icon: <FontAwesome5 name="suitcase" size={20} color="#29A86E" />,
    title: 'Kleine vakantie',
    progress: 0.02,
    progressText: '2%',
    description: 'Je kunt nu een dagtrip of weekendje weg plannen.',
  },
  {
    icon: <FontAwesome5 name="mobile-alt" size={20} color="#29A86E" />,
    title: 'Nieuwe gadget',
    progress: 0.006,
    progressText: '0.6%',
    description: 'Je hebt genoeg gespaard voor een mooie investering, zoals een gadget of abonnement.',
  },
  {
    icon: <FontAwesome5 name="money-bill-wave" size={20} color="#29A86E" />,
    title: 'Levensverandering',
    progress: 0.0016,
    progressText: '0.16%',
    description: 'Je hebt een aanzienlijk bedrag bespaard, denk aan een vakantie of grote aankoop!',
  },
];

const GeldDoelen = () => {
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

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
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
