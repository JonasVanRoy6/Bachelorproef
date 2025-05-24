import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const periods = ['Dag', 'Week', 'Maand'] as const;
type Period = typeof periods[number];

const StatsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Dag');
  const [stats, setStats] = useState({ totalPuffs: 0, duration: 0, liquid: '0.00' });
  const [chartData, setChartData] = useState([
    { label: 'Ochtend', value: 0 },
    { label: 'Middag', value: 0 },
    { label: 'Avond', value: 0 },
    { label: 'Nacht', value: 0 },
  ]);

  const fetchStats = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('Geen userId gevonden');
        return;
      }

      console.log('Verstuurde parameters:', { userId, selectedPeriod });

      const response = await fetch(
        `${API_BASE_URL}/stats?userId=${userId}&period=${selectedPeriod}`
      );
      const data = await response.json();

      console.log('Ophalen van statistieken:', data);

      if (response.ok) {
        const ochtend = parseInt(data.ochtend || '0', 10);
        const middag = parseInt(data.middag || '0', 10);
        const avond = parseInt(data.avond || '0', 10);
        const nacht = parseInt(data.nacht || '0', 10);

        // Update de stats-state
        setStats({
          totalPuffs: ochtend + middag + avond + nacht,
          duration: (ochtend + middag + avond + nacht) * 3,
          liquid: ((ochtend + middag + avond + nacht) * 0.02).toFixed(2),
        });

        console.log('Stats bijgewerkt:', {
          totalPuffs: ochtend + middag + avond + nacht,
          duration: (ochtend + middag + avond + nacht) * 3,
          liquid: ((ochtend + middag + avond + nacht) * 0.02).toFixed(2),
        });

        // Update de chartData-state
        setChartData([
          { label: 'Ochtend', value: ochtend },
          { label: 'Middag', value: middag },
          { label: 'Avond', value: avond },
          { label: 'Nacht', value: nacht },
        ]);

        console.log('ChartData bijgewerkt:', [
          { label: 'Ochtend', value: ochtend },
          { label: 'Middag', value: middag },
          { label: 'Avond', value: avond },
          { label: 'Nacht', value: nacht },
        ]);
      } else {
        console.error('Fout bij het ophalen van statistieken:', data.error);
      }
    } catch (error) {
      console.error('Fout bij het ophalen van statistieken:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [selectedPeriod]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('nl-NL', options);
  };

  const xLabels = {
    Dag: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
    Week: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
    Maand: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  };

  const getAverageLabel = () => {
    switch (selectedPeriod) {
      case 'Dag': return 'Gemiddeld per uur';
      case 'Week': return 'Gemiddeld per dag';
      case 'Maand': return 'Gemiddeld per week';
    }
  };

  const calculateAverage = () => {
    switch (selectedPeriod) {
      case 'Dag':
        return (stats.totalPuffs / 24).toFixed(1); // Gemiddeld per uur (24 uur in een dag)
      case 'Week':
        return (stats.totalPuffs / 7).toFixed(1); // Gemiddeld per dag (7 dagen in een week)
      case 'Maand':
        return (stats.totalPuffs / 4).toFixed(1); // Gemiddeld per week (4 weken in een maand)
      default:
        return '0.0';
    }
  };

  const scaleFactor = 140 / 80;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Statistieken</Text>

      <View style={styles.selectorWrapper}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedPeriod(period)}
            style={styles.selectorButtonWrapper}
          >
            <View
              style={[
                styles.selectorButton,
                selectedPeriod === period && styles.selectorButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.selectorText,
                  selectedPeriod === period && styles.selectorTextActive,
                ]}
              >
                {period}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* Stats */}
          <View style={styles.widgetRow}>
            {[
              { icon: 'smoking', label: 'Puffs', value: stats.totalPuffs.toString() },
              { icon: 'timer-outline', label: 'Duur', value: formatDuration(stats.duration) },
              { icon: 'water-outline', label: 'Vloeistof', value: `${stats.liquid} ml` },
            ].map((item, index) => (
              <View key={index} style={styles.statBox}>
                <MaterialCommunityIcons name={item.icon} size={24} color="#29A86E" />
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Chart */}
          <View style={styles.chartWidget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>
                Gebruik {selectedPeriod === 'Dag' ? 'Vandaag' : selectedPeriod === 'Week' ? 'Deze Week' : 'Deze Maand'}
              </Text>
              <Text style={styles.widgetSub}>{formatDate(new Date())}</Text>
            </View>
            <View style={styles.chartContainer}>
              {chartData.map((item, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: item.value * scaleFactor }]} />
                  <Text style={styles.barLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Piektijden */}
          <View style={styles.peakWidget}>
            <Text style={[styles.widgetTitle, { marginBottom: 16 }]}>Piekgebruik</Text>
            {['8:00 - 10:00', '14:00 - 16:00', '18:00 - 21:00'].map((label, idx) => (
              <View key={idx} style={styles.peakBlock}>
                <Text style={styles.peakLabel}>{label}</Text>
                <View style={styles.peakBarBg}>
                  <View style={[styles.peakBarFill, { width: SCREEN_WIDTH * 0.5 }]} />
                </View>
              </View>
            ))}
          </View>

          {/* Vergelijkingen */}
          {[
            { label: getAverageLabel(), value: `${calculateAverage()}`, icon: '' },
            { label: 'vs. gisteren', value: '+12%', icon: <Feather name="trending-up" size={20} color="#29A86E" /> },
            { label: 'vs. vorige week', value: '-8%', icon: <Feather name="trending-down" size={20} color="#29A86E" /> },
            { label: 'vs. vorige maand', value: '-15%', icon: <Feather name="trending-down" size={20} color="#29A86E" /> },
          ].map((item, i) => (
            <View key={i} style={styles.compareWidget}>
              <View>
                <Text style={styles.compareLabel}>{item.label}</Text>
                <Text style={styles.compareValue}>{item.value}</Text>
              </View>
              {typeof item.icon === 'string' ? (
                <Text style={styles.compareChange}>{item.icon}</Text>
              ) : (
                item.icon
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#252525',
    marginBottom: 24,
  },
  inner: { paddingHorizontal: 16 },
  selectorWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.9,
    height: 44,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
    padding: 4,
  },
  selectorButtonWrapper: { flex: 1 },
  selectorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    borderRadius: 12,
  },
  selectorButtonActive: { backgroundColor: '#29A86E' },
  selectorText: { fontSize: 14, color: '#515151', fontWeight: '500' },
  selectorTextActive: { color: '#F5F5F5' },
  widgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    height: 103,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginBottom: 6 },
  statLabel: { fontSize: 14, color: '#515151' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#252525' },
  chartWidget: {
    width: '100%',
    height: 284,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  widgetTitle: { fontSize: 18, fontWeight: '600', color: '#252525' },
  widgetSub: { fontSize: 14, color: '#29A86E' },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  barWrapper: { alignItems: 'center' },
  bar: {
    width: 22,
    backgroundColor: '#29A86E',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barLabel: { fontSize: 12, color: '#515151', marginTop: 4 },
  peakWidget: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  peakBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  peakLabel: { fontSize: 14, color: '#252525', width: 100, marginRight: 16 },
  peakBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#DFF2E9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  peakBarFill: {
    height: '100%',
    backgroundColor: '#29A86E',
    borderRadius: 4,
  },
  compareWidget: {
    width: '100%',
    height: 68,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  compareLabel: { fontSize: 14, color: '#515151' },
  compareValue: { fontSize: 20, fontWeight: '600', color: '#252525' },
  compareChange: { fontSize: 14, color: '#29A86E' },
});

export default StatsScreen;
