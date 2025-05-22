import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import API_BASE_URL from '../server/config';

const { width } = Dimensions.get('window');
const CONTENT_PADDING = 20;

function UserCard({ user, onRemove }: { user: any; onRemove: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <View>
          <Text style={styles.name}>{user.name || 'Onbekende gebruiker'}</Text>
          <Text style={styles.username}>{user.username || ''}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeText}>Verwijderen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CreateLeaderboardScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [name, setName] = useState('');
  const [friends, setFriends] = useState<any[]>([]);
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
      const response = await fetch(`${API_BASE_URL}/leaderboard/friends?leaderboardId=${leaderboardId}`);
      const data = await response.json();
      if (response.ok) {
        setFriends(data);
      } else {
        alert(data.error || 'Fout bij ophalen van vrienden.');
      }
    } catch (error) {
      console.error(error);
      alert('Verbindingsfout met de server.');
    }
  };

  const removeFriend = (username: string) => {
    setFriends(prev => prev.filter(f => f.username !== username));
  };

  const updateLeaderboardName = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaderboardId, name }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Leaderboard bijgewerkt!');
        router.push(`/leaderboard`);
      } else {
        alert(data.error || 'Fout bij bijwerken leaderboard.');
      }
    } catch (error) {
      console.error(error);
      alert('Verbindingsfout met de server.');
    }
  };

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/leaderboard')}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard aanmaken</Text>
        <View style={{ width: 24 }} />
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
  wrapper: { backgroundColor: '#fff' },
  container: {
    paddingTop: 64,
    paddingHorizontal: CONTENT_PADDING,
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
    color: '#252525',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#252525',
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
    color: '#252525',
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
    color: '#252525',
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
});
