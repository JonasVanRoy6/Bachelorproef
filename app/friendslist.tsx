import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const getUserId = async (): Promise<number | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Fout bij het ophalen van de gebruiker-ID:', error);
    return null;
  }
};

const fetchFriends = async (setFriends: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const userId = await getUserId(); // Haal de ingelogde gebruiker-ID op

    if (!userId) {
      alert('Kan de ingelogde gebruiker niet vinden.');
      return;
    }

    const response = await fetch(`http://192.168.0.105:5000/user/friends?userId=${userId}`);
    const data = await response.json();

    if (response.ok) {
      // Voeg de `added`-eigenschap toe aan elke vriend
      const friendsWithAdded = data.map((friend: any) => ({
        ...friend,
        added: false, // Standaard op false
      }));
      setFriends(friendsWithAdded);
    } else {
      alert(data.error || 'Er is iets misgegaan bij het ophalen van vrienden.');
    }
  } catch (error) {
    console.error('Fout bij het ophalen van vrienden:', error);
    alert('Kan geen verbinding maken met de server.');
  }
};

const removeFriendFromDatabase = async (friendId: number) => {
  try {
    const userId = await getUserId(); // Haal de ingelogde gebruiker-ID op

    if (!userId) {
      alert('Kan de ingelogde gebruiker niet vinden.');
      return;
    }

    const response = await fetch('http://192.168.0.105:5000/user/remove-friend', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        friendId,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message); // Laat een melding zien als het succesvol is
    } else {
      alert(data.error || 'Er is iets misgegaan bij het verwijderen van de vriend.');
    }
  } catch (error) {
    console.error('Fout bij het verwijderen van de vriend:', error);
    alert('Kan geen verbinding maken met de server.');
  }
};

export default function FriendsListScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchFriends(setFriends); // Haal vrienden op bij het laden van de pagina
  }, []);

  const removeFriend = async (index: number) => {
    const friend = friends[index];

    // Verwijder vriend uit de database
    await removeFriendFromDatabase(friend.id);

    // Verwijder vriend uit de lijst
    const updated = [...friends];
    updated.splice(index, 1); // Verwijder de vriend uit de array
    setFriends(updated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vrienden</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Friend Cards */}
      <View style={styles.friendList}>
        {friends.map((friend, index) => (
          <View key={index} style={styles.friendCard}>
            <Image source={{ uri: 'https://via.placeholder.com/48' }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{friend.name} {friend.last_name}</Text>
              <Text style={styles.username}>{friend.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => removeFriend(index)} // Verwijder vriend bij klikken
            >
              <FontAwesome
                name="check" // Toon standaard het check-icoon
                size={16}
                color="#29A86E"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Toevoegen link */}
      <TouchableOpacity style={styles.addLink} onPress={() => router.push('/add-friends')}>
        <Text style={styles.addText}>VRIENDEN TOEVOEGEN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },
  friendList: {
    gap: 12,
    marginBottom: 24,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252525',
  },
  username: {
    fontSize: 12,
    color: '#515151',
  },
  actionButton: {
    width: 42,
    height: 32,
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedButton: {
    backgroundColor: '#29A86E26',
    borderColor: '#29A86E',
  },
  addLink: {
    alignItems: 'center',
    marginTop: 12,
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#29A86E',
  },
});
