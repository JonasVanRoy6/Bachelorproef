import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import API_BASE_URL from '../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type User = {
  id: number;
  name: string;
  last_name: string;
  email: string;
};

const saveUserId = async (userId: number) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.error('Fout bij het opslaan van de gebruiker-ID:', error);
  }
};

const getUserId = async (): Promise<number | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Fout bij het ophalen van de gebruiker-ID:', error);
    return null;
  }
};

const addFriendToDatabase = async (friendId: number) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      alert('Kan de ingelogde gebruiker niet vinden.');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/user/add-friend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error || 'Er is iets misgegaan');
    }
  } catch (error) {
    console.error(error);
    alert('Kan geen verbinding maken met de server');
  }
};

const fetchUsers = async (
  searchTerm: string,
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/user/search?search=${searchTerm}`
    );
    const data = await response.json();

    if (response.ok) {
      setAllUsers(data);
    } else {
      alert(data.error || 'Er is iets misgegaan bij het ophalen van gebruikers.');
    }
  } catch (error) {
    console.error(error);
    alert('Kan geen verbinding maken met de server.');
  }
};

export default function AddFriendsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState<number[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const toggleAdd = (userId: number) => {
    setAdded((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Zoek vrienden</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={16} color="#515151" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Zoek op naam of e-mailadres"
            placeholderTextColor="#515151"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              fetchUsers(text, setAllUsers);
            }}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => {
              setSearch('');
              setAllUsers([]); // Wis ook de zoekresultaten
            }}>
              <FontAwesome name="close" size={18} color="#29A86E" />
            </TouchableOpacity>
          )}
        </View>

        {search.length > 0 && allUsers.length === 0 ? (
  <View style={styles.emptyState}>
    <Image
      source={require('../assets/images/ImageNoResults.png')}
      style={styles.emptyImage}
      resizeMode="contain"
    />
    <Text style={styles.emptyTitle}>Geen resultaten</Text>
    <Text style={styles.emptyText}>We vonden geen gebruikers met die zoekterm.</Text>
  </View>
) : allUsers.length > 0 ? (
  <>
    <Text style={styles.resultCount}>
      {allUsers.length} resultaat{allUsers.length !== 1 ? 'en' : ''}
    </Text>

    {allUsers.map((user) => (
      <View key={user.id} style={styles.card}>
        <Image
          source={{ uri: user.profilePicture || 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name} {user.last_name}</Text>
          <Text style={styles.username}>{user.email}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.actionButton,
            added.includes(user.id) && styles.checkedButton,
          ]}
          onPress={() => {
            toggleAdd(user.id);
            addFriendToDatabase(user.id);
          }}
        >
          <FontAwesome
            name={added.includes(user.id) ? 'check' : 'user-plus'}
            size={16}
            color="#29A86E"
          />
        </TouchableOpacity>
      </View>
    ))}
  </>
) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: 64,
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
    color: '#252525',
  },
  resultCount: {
    fontSize: 14,
    color: '#252525',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
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
