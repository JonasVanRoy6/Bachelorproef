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
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../server/config';
import initialBadges from '../../components/badgesData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const profileImage = require('../../assets/images/spongebob.png');

// ✅ Alleen behaalde badges tonen – hier dus alleen First Step Hero
const badges = [
  {
    name: 'First Step Hero',
    icon: 'rocket',
    color: '#29A86E',
    background: '#DFF5E5',
    date: '8 jan 2025',
    description: 'Je bent gestart met je rookvrije reis. Goed begin!',
    checklist: [
      'App geopend',
      'Account aangemaakt',
      'Eerste dag onder vape-doel gebleven',
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [profilePicture, setProfilePicture] = useState(profileImage);
  const [friendsList, setFriendsList] = useState([]);
  const [completedBadges, setCompletedBadges] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
        const res = await fetch(`${API_BASE_URL}/user-data?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setProfilePicture(data.profilePicture || 'https://via.placeholder.com/150');
          setUserName(data.firstName);
          setUserEmail(data.email);
        } else {
          alert(data.error || 'Fout bij ophalen gebruiker.');
        }
      } catch {
        alert('Serverfout.');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
        const response = await fetch(`${API_BASE_URL}/suggested-friends?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setSuggestedFriends(data);
        } else {
          alert(data.error || 'Fout bij het ophalen van voorgestelde vrienden.');
        }
      } catch (error) {
        alert('Kan geen verbinding maken met de server.');
      }
    };
    fetchSuggestedFriends();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
        const response = await fetch(`${API_BASE_URL}/user/friends-with-photos?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setFriendsList(data);
        } else {
          alert(data.error || 'Fout bij het ophalen van vrienden.');
        }
      } catch (error) {
        alert('Kan geen verbinding maken met de server.');
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchCompletedBadges = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
        const response = await fetch(`${API_BASE_URL}/badges?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          // Combineer behaalde badges met volledige badgegegevens
          const achievedBadges = data.badges; // Namen van behaalde badges
          const completed = initialBadges
            .filter((badge) => achievedBadges.includes(badge.name)) // Filter behaalde badges
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sorteer op datum
            .slice(0, 3); // Neem de laatste 3 badges

          setCompletedBadges(completed);
        } else {
          alert(data.error || 'Fout bij het ophalen van badges.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van badges:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchCompletedBadges();
  }, []);

  const addFriend = async (friendId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');
      const response = await fetch(`${API_BASE_URL}/add-friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, friendId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Vriend succesvol toegevoegd.');
        setSuggestedFriends((prev) => prev.filter((f) => f.friendId !== friendId));
      } else {
        alert(data.error || 'Fout bij het toevoegen van een vriend.');
      }
    } catch (error) {
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#29A86E' }}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: typeof profilePicture === 'string' ? profilePicture : 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <FontAwesome name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
            <FontAwesome name="cog" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userName || 'Onbekende gebruiker'}</Text>
        <Text style={styles.username}>{userEmail || 'Onbekend e-mailadres'}</Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mijn vrienden</Text>
            <TouchableOpacity onPress={() => router.push('/friendslist')}>
              <Text style={styles.viewAll}>Beheren</Text>
            </TouchableOpacity>
          </View>

          {friendsList.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#252525', marginBottom: 4 }}>
                Nog geen vrienden toegevoegd
              </Text>
              <Text style={{ fontSize: 14, color: '#515151', textAlign: 'center', marginBottom: 12 }}>
                Voeg vrienden toe en moedig elkaar aan.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/friendslist')}
                style={{
                  backgroundColor: '#29A86E',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                  Vriend toevoegen
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {friendsList.map((friend) => (
                  <View key={friend.friendId} style={styles.friendItem}>
                    <Image source={{ uri: friend.profilePicture }} style={styles.friendAvatar} />
                    <Text style={styles.friendName}>{friend.firstName}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>




          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mijn badges</Text>
              <TouchableOpacity onPress={() => router.push('/badges')}>
                <Text style={styles.viewAll}>Alles bekijken</Text>
              </TouchableOpacity>
            </View>
            {completedBadges.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                  <Text style={{ fontSize: 14, color: '#515151', textAlign: 'center' }}>
                    Nog geen badges behaald.
                  </Text>
                </View>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.horizontalList}>
                    {completedBadges.map((badge, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.badge, { backgroundColor: badge.background || '#DFF5E5' }]}
                        onPress={() => setSelectedBadge(badge)}
                      >
                        <FontAwesome name={badge.icon} size={20} color={badge.color || '#29A86E'} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
            <Text  style={styles.sectionTitle}>Voorgestelde vrienden</Text>
            </View>
            {suggestedFriends.map((sugg, index) => (
              <View key={sugg.friendId} style={styles.suggestionItem}>
                <Image source={{ uri: sugg.profilePicture || 'https://via.placeholder.com/48' }} style={styles.suggestionAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.suggestionName}>{sugg.firstName} {sugg.lastName}</Text>
                  <Text style={styles.suggestionInfo}>{sugg.email}</Text>
                </View>
                <TouchableOpacity style={styles.inviteButton} onPress={() => addFriend(sugg.friendId)}>
                  <FontAwesome name="user-plus" size={14} color="#29A86E" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#29A86E',
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    borderWidth: 2,
    borderColor: '#fff',
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
  settingsButton: {
    position: 'absolute',
    right: 24,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  username: {
    fontSize: 16,
    color: '#E5FFE6',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
  },
  content: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingBottom: 40,
  },
  viewAll: {
    color: '#29A86E',
    fontSize: 12,
    fontWeight: '600',
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
    marginBottom: 16,
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
  badge: {
    width: 64, // Grotere badge
    height: 64,
    borderRadius: 32, // Ronde badge
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});