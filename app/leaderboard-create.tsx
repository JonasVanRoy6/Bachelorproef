import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

function UserCard({ user, onRemove }: { user: any; onRemove: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
       
        <View>
          <Text style={styles.name}>{user.name || 'Onbekende gebruiker'}</Text>
          <Text style={styles.username}>{user.username || ''}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
      >
        <Text style={styles.removeText}>Verwijderen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CreateLeaderboardScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [name, setName] = useState('');
  const [friends, setFriends] = useState<any[]>([]); // Standaard lege array
  const [selectedFriends, setSelectedFriends] = useState<any[]>([]); // Geselecteerde vrienden
  const leaderboardId = params.leaderboardId;

  useEffect(() => {
    if (params.friends) {
      try {
        const parsedFriends = JSON.parse(params.friends as string);
        if (Array.isArray(parsedFriends)) {
          setFriends(parsedFriends);
        } else {
          console.error('Ongeldig formaat voor vrienden:', parsedFriends);
        }
      } catch (error) {
        console.error('Fout bij het parsen van vrienden:', error);
      }
    }
  }, [params.friends]);

  useEffect(() => {
    if (leaderboardId) {
      fetchFriendsFromDatabase();
    }
  }, [leaderboardId]);

  const fetchFriendsFromDatabase = async () => {
    try {
      const response = await fetch('http://192.168.0.105:5000/leaderboard/friends?leaderboardId=' + leaderboardId);
      const data = await response.json();

      if (response.ok) {
        console.log('Vrienden opgehaald:', data);
        setFriends(data); // Stel de vrienden in de state in
      } else {
        console.error('Fout bij het ophalen van vrienden:', data.error);
        alert(data.error || 'Er is iets misgegaan bij het ophalen van vrienden.');
      }
    } catch (error) {
      console.error('Kan geen verbinding maken met de server:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const removeFriend = (username: string) => {
    setFriends(prev => prev.filter(f => f.username !== username));
  };

  const removeFriendFromLeaderboard = async (friendId: number) => {
    try {
      const response = await fetch('http://192.168.0.105:5000/leaderboard/friends', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leaderboardId,
          friendId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Verwijder de vriend uit de lokale state
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
      } else {
        alert(data.error || 'Er is iets misgegaan bij het verwijderen van de vriend.');
      }
    } catch (error) {
      console.error('Fout bij het verwijderen van de vriend:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const createLeaderboard = async () => {
    try {
      const userId = await getUserId();

      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      if (!name.trim()) {
        alert('Geef een naam op voor het leaderboard.');
        return;
      }

      const response = await fetch('http://192.168.0.105:5000/leaderboard/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userId,
          friends: selectedFriends.map(friend => friend.id), // Stuur alleen de IDs van de vrienden
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);

        // Navigeer naar het leaderboard-scherm en geef de nieuwe data door
        router.push({
          pathname: '/leaderboard',
          params: { created: 'true' },
        });
      } else {
        alert(data.error || 'Er is iets misgegaan bij het aanmaken van het leaderboard.');
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const createLeaderboardWithFriends = async () => {
    try {
      const userId = await getUserId();

      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      // Verzamel de uitgenodigde vrienden
      const invitedFriends = friends.filter(friend => friend.invited).map(friend => friend.id);

      if (invitedFriends.length === 0) {
        alert('Selecteer minstens één vriend om een leaderboard aan te maken.');
        return;
      }

      const response = await fetch('http://192.168.0.105:5000/leaderboard/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          friends: invitedFriends, // Stuur de uitgenodigde vrienden mee
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Leaderboard aangemaakt met ID:', data.leaderboardId);
        router.replace({
          pathname: '/leaderboard-create',
          params: { leaderboardId: data.leaderboardId }, // Stuur het leaderboardId door
        });
      } else {
        alert(data.error || 'Er is iets misgegaan bij het aanmaken van het leaderboard.');
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const updateLeaderboardName = async () => {
    try {
      const response = await fetch(`http://192.168.0.105:5000/leaderboard/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leaderboardId,
          name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Leaderboard succesvol bijgewerkt!');
        router.push(`/leaderboard/`); // Navigeer naar de leaderboard-pagina
      } else {
        alert(data.error || 'Er is iets misgegaan bij het bijwerken van het leaderboard.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const navigateToLeaderboardCreate = () => {
    if (selectedFriends.length === 0) {
      alert('Selecteer minstens één vriend om een leaderboard aan te maken.');
      return;
    }
    createLeaderboard();
  };

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/leaderboard')}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard aanmaken</Text>
        <View style={{ width: 24 }} /> {/* voor centrering */}
      </View>

      <Text style={styles.label}>Naam leaderboard</Text>
      <View style={styles.inputWrapper}>
        <FontAwesome name="search" size={16} color="#515151" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Geef een naam in"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inviteBox}>
        <View style={styles.inviteHeader}>
          <Text style={styles.inviteTitle}>Vrienden Uitnodigen</Text>
          <TouchableOpacity onPress={() => router.push('/invite')}>
            <FontAwesome name="user-plus" size={18} color="#29A86E" />
          </TouchableOpacity>
        </View>

        {friends.length > 0 ? (
          friends.map(friend => (
            <UserCard
              key={friend.id}
              user={friend}
              onRemove={() => removeFriend(friend.username)}
            />
          ))
        ) : (
          <Text style={styles.noFriendsText}>Geen vrienden beschikbaar.</Text>
        )}
      </View>

     

   

      <TouchableOpacity onPress={updateLeaderboardName} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Leaderboard aanmaken</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 53,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  inviteBox: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  inviteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inviteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '600',
  },
  friendUsername: {
    fontSize: 13,
    color: '#515151',
  },
  createButton: {
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  username: {
    fontSize: 13,
    color: '#515151',
  },
  removeButton: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeText: {
    color: '#515151',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noFriendsText: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
    marginTop: 10,
  },
});
