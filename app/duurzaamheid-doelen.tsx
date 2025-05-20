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
    icon: <Feather name="trash-2" size={20} color="#3ED9E2" />,
    title: 'Kleine Impact',
    progress: 0.28,
    progressText: '28%',
    description: 'Je hebt al een bijdrage geleverd door minder vape-afval te produceren.',
  },
  {
    icon: <FontAwesome5 name="recycle" size={20} color="#3ED9E2" />,
    title: 'Schonere omgeving',
    progress: 0.08,
    progressText: '8%',
    description: 'Je voorkomt dat schadelijke stoffen in de natuur belanden.',
  },
  {
    icon: <Feather name="shopping-bag" size={20} color="#3ED9E2" />,
    title: 'Duurzame keuze',
    progress: 0.02,
    progressText: '2%',
    description: 'Je helpt de vraag naar wegwerp-vapes en nicotineproducten te verminderen.',
  },
  {
    icon: <Feather name="wind" size={20} color="#3ED9E2" />,
    title: 'Frisse lucht',
    progress: 0.006,
    progressText: '0.6%',
    description: 'Je vermindert luchtvervuiling door minder uitstoot en afval.',
  },
  {
    icon: <FontAwesome5 name="globe" size={20} color="#3ED9E2" />,
    title: 'Groene toekomst',
    progress: 0.0016,
    progressText: '0.16%',
    description: 'Je draagt bij aan een schonere, duurzamere planeet.',
  },
];

const DuurzaamheidDoelen = () => {
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
