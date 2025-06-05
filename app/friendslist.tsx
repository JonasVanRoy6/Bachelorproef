import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import API_BASE_URL from '../server/config';

const getUserId = async (): Promise<number | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Fout bij het ophalen van de gebruiker-ID:', error);
    return null;
  }
};

export default function FriendsListScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);
  const [showBadgePopup, setShowBadgePopup] = useState(false);

  const fetchFriends = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');

      const response = await fetch(`${API_BASE_URL}/user/friends?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        const updated = data.map((f: any) => ({ ...f, added: false }));
        setFriends(updated);

        const earnedAlready = await AsyncStorage.getItem(`badgeEarned_friends_user_${userId}`);
        const alreadyEarned = earnedAlready === 'true';

        if (updated.length >= 2 && !alreadyEarned) {
          await AsyncStorage.setItem(`badgeEarned_friends_user_${userId}`, 'true');
          setShowBadgePopup(true);
        }
      } else {
        alert(data.error || 'Fout bij het ophalen van vrienden.');
      }
    } catch (error) {
      console.error('Fout bij ophalen vrienden:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const removeFriendFromDatabase = async (friendId: number) => {
    try {
      const userId = await getUserId();
      if (!userId) return alert('Kan de ingelogde gebruiker niet vinden.');

      const response = await fetch(`${API_BASE_URL}/user/remove-friend`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, friendId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error || 'Fout bij verwijderen van vriend.');
      }
    } catch (error) {
      console.error('Fout bij verwijderen:', error);
      alert('Serverfout bij verwijderen van vriend.');
    }
  };

  const removeFriend = async (index: number) => {
    const friend = friends[index];
    await removeFriendFromDatabase(friend.id);

    const updated = [...friends];
    updated.splice(index, 1);
    setFriends(updated);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vrienden</Text>
        <View style={{ width: 24 }} />
      </View>

      {friends.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('../assets/images/ImageNoFriends.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>Nog geen vrienden</Text>
          <Text style={styles.emptyText}>Maak contact met andere gebruikers</Text>
        </View>
      ) : (
        <View style={styles.friendList}>
          {friends.map((friend, index) => (
            <View key={index} style={styles.friendCard}>
              <Image
                source={{ uri: friend.profilePicture || 'https://via.placeholder.com/48' }}
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{friend.name} {friend.last_name}</Text>
                <Text style={styles.username}>{friend.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFriend(index)}
              >
                <FontAwesome name="trash" size={16} color="#EB5757" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.addLink}>
        <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/add-friends')}>
          <Text style={styles.searchButtonText}>Vrienden Zoeken</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showBadgePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBadgePopup(false)}
      >
        <View style={styles.modalOverlayFullScreen}>
          <View style={styles.modalFullScreenContent}>
            <Image
              source={require('../assets/images/ImageBadgeEarned.png')}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Text style={styles.fullTitle}>Proficiat!</Text>
            <Text style={styles.fullText}>
              Je hebt de badge <Text style={styles.streakHighlight}>"Vrienden Strijder"</Text> verdiend door 2 vrienden toe te voegen!
            </Text>
            <TouchableOpacity
              onPress={() => setShowBadgePopup(false)}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Doorgaan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  content: { paddingHorizontal: 20, paddingTop: 64, paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#252525' },
  friendList: { gap: 12, marginBottom: 24 },
  friendCard: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 0.8, borderColor: '#E3E3E3',
    borderRadius: 12, padding: 12, width: '100%',
  },
  avatar: {
    width: screenWidth < 360 ? 36 : 44,
    height: screenWidth < 360 ? 36 : 44,
    borderRadius: 22, marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#252525' },
  username: { fontSize: 12, color: '#515151' },
  removeButton: {
    width: 42, height: 32, borderRadius: 8, borderWidth: 0.3,
    borderColor: '#E3E3E3', justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#EB575715',
  },
  addLink: { alignItems: 'center', marginTop: 12 },
  searchButton: {
    backgroundColor: '#29A86E', paddingHorizontal: 20,
    paddingVertical: 10, borderRadius: 20,
  },
  searchButtonText: {
    color: '#fefefe', fontSize: 14, fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center', justifyContent: 'center',
    marginTop: 40, marginBottom: 24,
  },
  emptyImage: { width: 200, height: 200, marginBottom: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#252525', marginBottom: 4 },
  emptyText: { fontSize: 14, color: '#515151', textAlign: 'center', marginBottom: 20 },
  modalOverlayFullScreen: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center',
  },
  modalFullScreenContent: {
    width: '100%', height: '100%', backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  fullImage: { width: 180, height: 180, marginBottom: 24 },
  fullTitle: { fontSize: 24, fontWeight: 'bold', color: '#252525', marginBottom: 12, textAlign: 'center' },
  fullText: { fontSize: 16, color: '#515151', textAlign: 'center', marginBottom: 32, paddingHorizontal: 16 },
  streakHighlight: { fontWeight: 'bold', color: '#29A86E' },
  continueButton: {
    backgroundColor: '#29A86E', paddingVertical: 14, paddingHorizontal: 40,
    borderRadius: 20, width: '80%', alignItems: 'center', marginBottom: 40,
  },
  continueButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
