import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [profilePicture, setProfilePicture] = useState(profileImage);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user-data?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Profile Picture URL:', data.profilePicture); // Log de URL
          setProfilePicture(data.profilePicture || 'https://via.placeholder.com/150'); // Gebruik een fallback-afbeelding
          setUserName(data.firstName); // Stel de gebruikersnaam in
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

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/suggested-friends?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setSuggestedFriends(data);
        } else {
          alert(data.error || 'Fout bij het ophalen van voorgestelde vrienden.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van voorgestelde vrienden:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchSuggestedFriends();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/user/friends-with-photos?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setFriendsList(data);
        } else {
          alert(data.error || 'Fout bij het ophalen van vrienden.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van vrienden:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchFriends();
  }, []);

  const toggleInvite = (name: string) => {
    setInvited((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const addFriend = async (friendId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/add-friend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Vriend succesvol toegevoegd.');
        setSuggestedFriends((prev) => prev.filter((friend) => friend.id !== friendId)); // Verwijder de toegevoegde vriend uit de lijst
      } else {
        alert(data.error || 'Fout bij het toevoegen van een vriend.');
      }
    } catch (error) {
      console.error('Fout bij het toevoegen van een vriend:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: typeof profilePicture === 'string' && profilePicture ? profilePicture : 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <FontAwesome name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userName || 'Onbekende gebruiker'}</Text>
          <Text style={styles.username}>{userEmail || 'Onbekend e-mailadres'}</Text>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalList}>
              {friendsList.map((friend) => (
                <View key={friend.friendId} style={styles.friendItem}>
                  <Image
                    source={{ uri: friend.profilePicture || 'https://via.placeholder.com/150' }}
                    style={styles.friendAvatar}
                  />
                  <Text style={styles.friendName}>{friend.firstName} </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mijn badges</Text>
            <TouchableOpacity onPress={() => router.push('/badges')}>
              <Text style={styles.viewAll}>Alles bekijken</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voorgestelde vrienden</Text>
          {suggestedFriends.map((sugg, index) => (
            <View
              key={sugg.friendId}
              style={[
                styles.suggestionItem,
                { marginTop: index === 0 ? 16 : 0, marginBottom: 16 },
              ]}
            >
              <Image
                source={{ uri: sugg.profilePicture || 'https://via.placeholder.com/48' }}
                style={styles.suggestionAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.suggestionName}>
                  {sugg.firstName} {sugg.lastName}
                </Text>
                <Text style={styles.suggestionInfo}>{sugg.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => addFriend(sugg.friendId)}
              >
                <FontAwesome name="user-plus" size={14} color="#29A86E" />
              </TouchableOpacity>
            </View>
          ))}
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
                style={[
                  styles.popupIconCircle,
                  { backgroundColor: selectedBadge?.background },
                ]}
              >
                <FontAwesome
                  name={selectedBadge?.icon}
                  size={36}
                  color={selectedBadge?.color}
                />
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
                  <FontAwesome
                    name="check"
                    size={14}
                    color="#29A86E"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.checkText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
  },
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    marginTop: 12,
  },
  username: {
    fontSize: 16,
    color: '#515151',
    marginTop: 4,
    marginBottom: 20,
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
  divider: {
    height: 0.6,
    backgroundColor: '#E3E3E3',
    marginBottom: 24,
  },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252525',
  },
  viewAll: {
    color: '#29A86E',
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  friendAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 6,
  },
  friendName: {
    fontSize: 12,
    color: '#252525',
    textAlign: 'center',
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
  },
  suggestionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#252525',
  },
  suggestionInfo: {
    fontSize: 14,
    color: '#515151',
  },
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
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: 20,
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
