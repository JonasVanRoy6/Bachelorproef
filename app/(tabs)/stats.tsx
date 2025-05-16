import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const periods = ['Dag', 'Week', 'Maand'] as const;
type Period = typeof periods[number];

const StatsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Dag');

  const chartData = {
    Dag: [15, 20, 35, 70, 90, 80, 40, 30],
    Week: [46, 60, 35, 50, 30, 65, 55],
    Maand: [60, 90, 40, 20],
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

  const scaleFactor = 140 / 80;

  return (
    <View style={styles.container}>
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
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <View style={styles.widgetRow}>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="smoking" size={24} color="#29A86E" style={styles.icon} />
              <Text style={styles.statLabel}>Puffs</Text>
              <Text style={styles.statValue}>46</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="timer-outline" size={24} color="#29A86E" style={styles.icon} />
              <Text style={styles.statLabel}>Duur</Text>
              <Text style={styles.statValue}>12m</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="water-outline" size={24} color="#29A86E" style={styles.icon} />
              <Text style={styles.statLabel}>Vloeistof</Text>
              <Text style={styles.statValue}>2.1 ml</Text>
            </View>
          </View>

          <View style={styles.chartWidget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>
                Gebruik {selectedPeriod === 'Dag' ? 'Vandaag' : selectedPeriod === 'Week' ? 'Deze Week' : 'Deze Maand'}
              </Text>
              <Text style={styles.widgetSub}>24 mar. 2025</Text>
            </View>
            <View style={styles.chartContainer}>
              {chartData[selectedPeriod].map((value, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: value * scaleFactor }]} />
                  <Text style={styles.barLabel}>{xLabels[selectedPeriod][i]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.peakWidget}>
            <Text style={[styles.widgetTitle, { marginBottom: 16 }]}>Piekgebruik</Text>
            <View style={styles.peakBlock}>
              <Text style={styles.peakLabel}>8:00 - 10:00</Text>
              <View style={styles.peakBarBg}><View style={[styles.peakBarFill, { width: 214 }]} /></View>
            </View>
            <View style={styles.peakBlock}>
              <Text style={styles.peakLabel}>14:00 - 16:00</Text>
              <View style={styles.peakBarBg}><View style={[styles.peakBarFill, { width: 214 }]} /></View>
            </View>
            <View style={styles.peakBlock}>
              <Text style={styles.peakLabel}>18:00 - 21:00</Text>
              <View style={styles.peakBarBg}><View style={[styles.peakBarFill, { width: 214 }]} /></View>
            </View>
          </View>

          <View style={styles.compareWidget}>
            <View>
              <Text style={styles.compareLabel}>{getAverageLabel()}</Text>
              <Text style={styles.compareValue}>6.5</Text>
            </View>
            <Text style={styles.compareChange}>↓ 8%</Text>
          </View>

          <View style={styles.compareWidget}>
            <View>
              <Text style={styles.compareLabel}>vs. gisteren</Text>
              <Text style={styles.compareValue}>+12%</Text>
            </View>
            <Feather name="trending-up" size={20} color="#29A86E" />
          </View>

          <View style={styles.compareWidget}>
            <View>
              <Text style={styles.compareLabel}>vs. vorige week</Text>
              <Text style={styles.compareValue}>-8%</Text>
            </View>
            <Feather name="trending-down" size={20} color="#29A86E" />
          </View>

          <View style={styles.compareWidget}>
            <View>
              <Text style={styles.compareLabel}>vs. vorige maand</Text>
              <Text style={styles.compareValue}>-15%</Text>
            </View>
            <Feather name="trending-down" size={20} color="#29A86E" />
          </View>
        </View>
      </ScrollView>
    </View>
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
  inner: {
    paddingHorizontal: 16,
  },
  selectorWrapper: {
    flexDirection: 'row',
    width: 370,
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
    marginHorizontal: 16,
    marginBottom: 24,
    width: 370,
    alignSelf: 'center',
  },
  statBox: {
    width: 112,
    height: 103,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  icon: { marginBottom: 6 },
  statLabel: { fontSize: 14, color: '#515151' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#252525' },
  chartWidget: {
    width: 370,
    height: 284,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
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
    width: 370,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
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
  peakLabel: { fontSize: 14, color: '#252525', width: 100, marginRight: 24 },
  peakBarBg: {
    width: 214,
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
    width: 370,
    height: 68,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
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
  compareValue: { fontSize: 20, fontWeight: '600', color: '#252525', marginTop: -2 },
  compareChange: { fontSize: 14, color: '#29A86E' },
});

export default StatsScreen;
