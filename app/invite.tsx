import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const screenWidth = Dimensions.get('window').width;

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
    const userId = await getUserId();
    if (!userId) {
      alert('Kan de ingelogde gebruiker niet vinden.');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/user/friends?userId=${userId}`);
    const data = await response.json();

    if (response.ok) {
      const friendsWithInvited = data.map((friend: any) => ({
        ...friend,
        invited: false,
      }));
      console.log('Opgehaalde vrienden:', friendsWithInvited); // Controleer de array
      setFriends(friendsWithInvited);
    } else {
      alert(data.error || 'Er is iets misgegaan bij het ophalen van vrienden.');
    }
  } catch (error) {
    console.error('Fout bij het ophalen van vrienden:', error);
    alert('Kan geen verbinding maken met de server.');
  }
};

export default function InviteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchFriends(setFriends);
  }, []);

 
  

  const handleInvite = (friendId: number) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, invited: !friend.invited } : friend
      )
    );
  };

  const createLeaderboardWithFriends = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      const invitedFriends = friends.filter((friend) => friend.invited).map((friend) => friend.id);

      console.log('Uitgenodigde vrienden:', invitedFriends); // Controleer de array

      if (invitedFriends.length === 0) {
        alert('Selecteer minstens één vriend om een leaderboard aan te maken.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/leaderboard/create-with-friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friends: invitedFriends }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || 'Er is iets misgegaan bij het aanmaken van het leaderboard.');
        return;
      }

      router.replace({
        pathname: '/leaderboard-create',
        params: { leaderboardId: data.leaderboardId },
      });
    } catch (error) {
      console.error('Fout bij het aanmaken van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const filtered = friends.filter(u =>
    search.length === 0 || u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Vrienden Uitnodigen</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={18} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Gebruikersnaam"
            placeholderTextColor="#515151"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {search.length > 0 && filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={require('../assets/images/ImageNoResults.png')} // let op juiste pad
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Geen resultaten</Text>
            <Text style={styles.emptyText}>
              We konden geen gebruikers vinden met deze naam.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {filtered.map((friend) => (
              <UserCard
                key={friend.id}
                user={friend}
                onToggle={() => handleInvite(friend.id)}
              />
            ))}
          </ScrollView>
        )}


        <TouchableOpacity onPress={createLeaderboardWithFriends} style={styles.doneButton}>
          <Text style={styles.doneText}>Klaar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function UserCard({ user, onToggle }: { user: any; onToggle: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Image
          source={{ uri: user.profilePicture || 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user.name} {user.lastName}</Text>
          <Text style={styles.username}>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={user.invited ? styles.invitedButton : styles.inviteButton}
        onPress={onToggle}
      >
        <Text style={user.invited ? styles.invitedText : styles.inviteText}>
          {user.invited ? 'Uitgenodigd' : 'Uitnodigen'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 53,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    color: '#515151',
  },
  inviteButton: {
    backgroundColor: '#fff',
    borderColor: '#29A86E',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  inviteText: {
    fontSize: 14,
    color: '#29A86E',
    fontWeight: '600',
  },
  invitedButton: {
    backgroundColor: '#29A86E',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  invitedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#29A86E',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  doneText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  emptyState: {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40,
  marginBottom: 24,
  paddingHorizontal: 20,
},
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
  },

});
