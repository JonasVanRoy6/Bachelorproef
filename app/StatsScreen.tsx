import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Dag');

  const getChartData = () => {
    switch (selectedPeriod) {
      case 'Dag':
        return {
          labels: ["6:00", "10:00", "14:00", "18:00", "22:00"],
          datasets: [
            {
              data: [0, 10, 20, 40, 60],
            },
          ],
        };
      case 'Week':
        return {
          labels: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
          datasets: [
            {
              data: [50, 60, 70, 80, 90, 100, 110],
            },
          ],
        };
      case 'Maand':
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              data: [200, 300, 400, 500],
            },
          ],
        };
      default:
        return {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.tabButton, selectedPeriod === 'Dag' && styles.selectedButton]}
          onPress={() => setSelectedPeriod('Dag')}
        >
          <Text style={styles.tabButtonText}>Dag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedPeriod === 'Week' && styles.selectedButton]}
          onPress={() => setSelectedPeriod('Week')}
        >
          <Text style={styles.tabButtonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedPeriod === 'Maand' && styles.selectedButton]}
          onPress={() => setSelectedPeriod('Maand')}
        >
          <Text style={styles.tabButtonText}>Maand</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.usageContainer}>
        <Text style={styles.usageTitle}>Gebruik Vandaag</Text>
        <Text style={styles.usageDate}>24 mar. 2025</Text>
        <View style={styles.usageStats}>
          <Text style={styles.usageStat}>46 Puffs</Text>
          <Text style={styles.usageStat}>12m Duur</Text>
          <Text style={styles.usageStat}>2.1 ml Vloeistof</Text>
        </View>
      </View>

      <LineChart
        data={getChartData()}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#4caf50",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <View style={styles.peakUsageContainer}>
        <Text style={styles.peakUsageTitle}>Piekgebruik</Text>
        <View style={styles.peakUsageItem}>
          <Text style={styles.peakUsageTime}>8:00 - 10:00</Text>
          <View style={styles.peakUsageBar}>
            <View style={[styles.peakUsageProgress, { width: '50%' }]} />
          </View>
        </View>
        <View style={styles.peakUsageItem}>
          <Text style={styles.peakUsageTime}>14:00 - 16:00</Text>
          <View style={styles.peakUsageBar}>
            <View style={[styles.peakUsageProgress, { width: '70%' }]} />
          </View>
        </View>
        <View style={styles.peakUsageItem}>
          <Text style={styles.peakUsageTime}>18:00 - 21:00</Text>
          <View style={styles.peakUsageBar}>
            <View style={[styles.peakUsageProgress, { width: '90%' }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { padding: 10, borderRadius: 5, backgroundColor: '#e0e0e0' },
  selectedButton: { backgroundColor: '#4caf50' },
  tabButtonText: { fontSize: 16, fontWeight: 'bold' },
  usageContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 },
  usageTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  usageDate: { fontSize: 14, color: 'gray', marginBottom: 10 },
  usageStats: { flexDirection: 'row', justifyContent: 'space-between' },
  usageStat: { fontSize: 16, fontWeight: 'bold' },
  peakUsageContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 20 },
  peakUsageTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  peakUsageItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  peakUsageTime: { fontSize: 14, color: 'gray', width: '30%' },
  peakUsageBar: { flex: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden' },
  peakUsageProgress: { height: '100%', backgroundColor: '#4caf50' },
});

export default StatsScreen;