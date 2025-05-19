import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileImage = require('../../assets/images/spongebob.png');

const friends = [
  { name: 'Jonas', img: require('../../assets/images/jonas.png') },
  { name: 'Arno', img: require('../../assets/images/arno.png') },
  { name: 'Lotte', img: require('../../assets/images/lotte.png') },
];

const badges = [
  { icon: 'rocket', color: '#DFF5E5' },
  { icon: 'leaf', color: '#DFF5E5' },
  { icon: 'bullseye', color: '#FEE9E9' },
  { icon: 'leaf', color: '#DFF5E5' },
];

const suggestions = [
  {
    name: 'Jens De Wachter',
    mutual: 3,
    img: require('../../assets/images/jens.png'),
  },
  {
    name: 'Andres Cochez',
    mutual: 3,
    img: require('../../assets/images/andres.png'),
  },
];

const badgeDetails = {
  name: 'Groene Dag',
  date: '8 jan 2025',
  description: 'Registreer en start je eerste dag in de app.',
  checklist: ['Open de app', 'Maak een account aan', 'Gebruik de app 1 dag'],
  icon: 'leaf',
  color: '#29A86E',
  background: '#DFF5E5',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [invited, setInvited] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [userName, setUserName] = useState(''); // Houd de naam van de gebruiker bij
  const [userEmail, setUserEmail] = useState(''); // Houd het e-mailadres van de gebruiker bij

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Haal de ingelogde gebruiker-ID op
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`http://192.168.0.105:5000/user-data?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.firstName); // Stel de voornaam in
          setUserEmail(data.email); // Stel het e-mailadres in
        } else {
          alert(data.error || 'Er is iets misgegaan bij het ophalen van gebruikersgegevens.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van gebruikersgegevens:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchUserData();
  }, []);

  const toggleInvite = (name: string) => {
    setInvited((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={profileImage} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <FontAwesome name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userName || 'Onbekende gebruiker'}</Text> {/* Toon de naam van de gebruiker */}
          <Text style={styles.username}>{userEmail || 'Onbekend e-mailadres'}</Text> {/* Toon het e-mailadres van de gebruiker */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <FontAwesome name="cog" size={24} color="#29A86E" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mijn vrienden</Text>
            <TouchableOpacity onPress={() => router.push('/friendslist')}>
              <Text style={styles.viewAll}>Alles bekijken</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalList}>
            {friends.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image source={friend.img} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mijn badges</Text>
            <TouchableOpacity onPress={() => router.push('/badges')}>
              <Text style={styles.viewAll}>Alles bekijken</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalList}>
            {badges.map((badge, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.badge, { backgroundColor: badge.color }]}
                onPress={() => setSelectedBadge(badgeDetails)}
              >
                <FontAwesome name={badge.icon} size={20} color="#29A86E" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voorgestelde vrienden</Text>
          {suggestions.map((sugg, index) => {
            const isInvited = invited.includes(sugg.name);
            return (
              <View
                key={index}
                style={[styles.suggestionItem, { marginTop: index === 0 ? 16 : 0, marginBottom: 16 }]}
              >
                <Image source={sugg.img} style={styles.suggestionAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.suggestionName}>{sugg.name}</Text>
                  <Text style={styles.suggestionInfo}>{sugg.mutual} gezamenlijke vrienden</Text>
                </View>
                <TouchableOpacity
                  style={isInvited ? styles.invitedButton : styles.inviteButton}
                  onPress={() => toggleInvite(sugg.name)}
                >
                  <FontAwesome name={isInvited ? 'check' : 'user-plus'} size={14} color="#29A86E" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Badge Pop-up */}
      <Modal transparent visible={!!selectedBadge} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>{selectedBadge?.name}</Text>
              <TouchableOpacity onPress={() => setSelectedBadge(null)}>
                <FontAwesome name="close" size={24} color="#29A86E" />
              </TouchableOpacity>
            </View>

            <View style={styles.popupContent}>
              <View
                style={[styles.popupIconCircle, { backgroundColor: selectedBadge?.background }]}
              >
                <FontAwesome name={selectedBadge?.icon} size={36} color={selectedBadge?.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.popupDate}>Verdiend op {selectedBadge?.date}</Text>
                <Text style={styles.popupDesc}>{selectedBadge?.description}</Text>
              </View>
            </View>

            <View style={styles.detailsBox}>
              <Text style={styles.detailsTitle}>Badge Details</Text>
              {selectedBadge?.checklist.map((item: string, index: number) => (
                <View key={index} style={styles.checkItem}>
                  <FontAwesome name="check" size={14} color="#29A86E" style={{ marginRight: 8 }} />
                  <Text style={styles.checkText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  content: { padding: 20, paddingTop: 64, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#29A86E',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: 'bold', color: '#252525', marginTop: 12 },
  username: { fontSize: 16, color: '#515151', marginTop: 4, marginBottom: 20 },
  settingsButton: { position: 'absolute', right: 0, top: 0, padding: 10 },
  divider: { height: 0.6, backgroundColor: '#E3E3E3', marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#252525' },
  viewAll: { color: '#29A86E', fontSize: 12, fontWeight: '600' },
  horizontalList: { flexDirection: 'row' },
  friendItem: { alignItems: 'center', marginRight: 16 },
  friendAvatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 6 },
  friendName: { fontSize: 12, color: '#252525' },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  suggestionAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  suggestionName: { fontSize: 16, fontWeight: '500', color: '#252525' },
  suggestionInfo: { fontSize: 14, color: '#515151' },
  inviteButton: {
    width: 42,
    height: 32,
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invitedButton: {
    width: 42,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    borderWidth: 0.3,
    borderColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#252525',
  },
  popupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  popupIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 4,
  },
  popupDesc: {
    fontSize: 14,
    color: '#515151',
  },
  detailsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkText: {
    fontSize: 14,
    color: '#515151',
  },
});
