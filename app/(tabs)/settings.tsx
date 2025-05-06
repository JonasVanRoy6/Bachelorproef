import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header met back button + gecentreerde titel */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instellingen</Text>
        <View style={{ width: 24 }} /> {/* Placeholder rechts voor centrering */}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionSpacing} />
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push('/accountsettings')}
>
          <FontAwesome name="user" size={18} color="#29A86E" />
          <Text style={styles.label}>Accountinstellingen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        {/* TRACKING & GOALS */}
        <Text style={styles.section}>TRACKING & GOALS</Text>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/connect-armband')}>
          <FontAwesome name="bluetooth" size={18} color="#29A86E" />
          <Text style={styles.label}>Verbind Armband</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="bullseye" size={18} color="#29A86E" />
          <Text style={styles.label}>Doelen Aanpassen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="calendar" size={18} color="#29A86E" />
          <Text style={styles.label}>Plan Aanpassen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        {/* MELDINGEN */}
        <Text style={styles.section}>MELDINGEN</Text>
        <View style={styles.item}>
          <FontAwesome name="bell" size={18} color="#29A86E" />
          <Text style={styles.label}>Pushmeldingen</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: '#29A86E' }}
            thumbColor="#fff"
          />
        </View>

        {/* ONDERSTEUNING & JURIDISCH */}
        <Text style={styles.section}>ONDERSTEUNING & JURIDISCH</Text>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="headphones" size={18} color="#29A86E" />
          <Text style={styles.label}>Support</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="shield" size={18} color="#29A86E" />
          <Text style={styles.label}>Privacybeleid</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="file" size={18} color="#29A86E" />
          <Text style={styles.label}>Servicevoorwaarden</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        {/* ACCOUNTACTIES */}
        <Text style={styles.section}>ACCOUNTACTIES</Text>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="sign-out" size={18} color="#29A86E" />
          <Text style={styles.label}>Uitloggen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <FontAwesome name="trash" size={18} color="#EB5757" />
          <Text style={styles.deleteLabel}>Account verwijderen</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    color: '#252525',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  sectionSpacing: {
    height: 24,
  },
  section: {
    fontSize: 14,
    fontWeight: '500',
    color: '#515151',
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#252525',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(235, 87, 87, 0.15)',
    borderWidth: 0.8,
    borderColor: 'rgba(235, 87, 87, 0.2)',
  },
  deleteLabel: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#EB5757',
    flex: 1,
  },
});

export default SettingsScreen;
