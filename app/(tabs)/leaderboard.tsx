import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../server/config';
import ImageNoLeaderboards from '../../assets/images/ImageNoLeaderboards.png'; // 👈 Toegevoegd

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Fout bij het ophalen van de gebruiker-ID:', error);
    return null;
  }
};

const LeaderboardScreen = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { created } = useLocalSearchParams();
  const [showSuccess, setShowSuccess] = useState(created === 'true');
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    if (created === 'true') {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [created]);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/leaderboards?userId=${userId}`);
      const data = await response.json();

      const detailedLeaderboards = await Promise.all(data.map(async lb => {
        const res = await fetch(`${API_BASE_URL}/leaderboard/details-with-rank?leaderboardId=${lb.leaderboard_id}&userId=${userId}`);
        const detail = await res.json();

        return {
          id: lb.leaderboard_id,
          name: lb.leaderboard_name,
          participants: detail.leaderboard.length,
          rank: detail.userRank,
          joined: true,
        };
      }));

      setLeaderboards(detailedLeaderboards);
    } catch (error) {
      console.error('Fout bij het ophalen van leaderboards:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const joinLeaderboard = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      if (!search) {
        alert('Voer een leaderboard naam in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/leaderboard/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, leaderboardName: search }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Je bent succesvol toegevoegd aan het leaderboard!');
        setSearch('');
        fetchLeaderboards();
      } else {
        alert(data.error || 'Er is een fout opgetreden.');
      }
    } catch (error) {
      console.error('Fout bij het joinen van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const filtered = leaderboards.filter(lb =>
    search.length > 0 ? lb.name.toLowerCase().includes(search.toLowerCase()) : lb.joined
  );

  const uniqueLeaderboards = leaderboards.filter(
    (lb, index, self) => index === self.findIndex((t) => t.id === lb.id)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Leaderboards</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mijn leaderboards</Text>
          <TouchableOpacity onPress={() => router.push('/leaderboard-create')}>
            <Text style={styles.addLink}>+ Toevoegen</Text>
          </TouchableOpacity>
        </View>

        {uniqueLeaderboards.length === 0 ? (
          <View style={styles.emptyState}>
            <Image source={ImageNoLeaderboards} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.emptyTitle}>Nog geen leaderboards</Text>
            <Text style={styles.emptyText}>Join of maak een leaderboard om de strijd aan te gaan!</Text>
          </View>
        ) : (
          uniqueLeaderboards.map((lb, index) => (
            <TouchableOpacity
              key={index}
              style={styles.joinedCard}
              onPress={() => router.push(`/leaderboarddetails?leaderboardId=${lb.id}`)}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{lb.name || 'Naam ontbreekt'}</Text>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{lb.rank || '-'}</Text>
                </View>
              </View>
              <Text style={styles.cardSub}>{lb.participants} deelnemers</Text>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Join een leaderboard</Text>

        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={16} color="#515151" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Geef een leaderboardnaam in"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#515151"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
              <Text style={styles.clearText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.joinButton} onPress={joinLeaderboard}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  addLink: {
    color: '#29A86E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  joinedCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    marginTop: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  cardSub: {
    marginTop: 4,
    color: '#777',
    fontSize: 13,
  },
  rankBadge: {
    backgroundColor: '#E3E8E5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rankText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 53,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#515151',
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    fontWeight: 'bold',
    color: '#29A86E',
  },
  joinButton: {
    backgroundColor: '#29A86E',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ✅ Empty state styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
  },
});

export default LeaderboardScreen;
