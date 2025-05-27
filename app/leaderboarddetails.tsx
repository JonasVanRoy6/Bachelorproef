import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const screenWidth = Dimensions.get('window').width;

export default function LeaderboardDetailsScreen() {
  const router = useRouter();
  const { leaderboardId } = useLocalSearchParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchLeaderboardDetails = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
      if (leaderboardId && id) {
        try {
          const res = await fetch(`${API_BASE_URL}/leaderboard/details-with-rank?leaderboardId=${leaderboardId}&userId=${id}`);
          const data = await res.json();

          const updatedList = data.leaderboard
            .sort((a, b) => a.total_puffs - b.total_puffs)
            .map((user, index) => ({
              ...user,
              name: user.user_id === id ? 'Jij' : user.name,
              rank: index + 1,
            }));

          setLeaderboardData(updatedList);
          setUserRank(updatedList.find(u => u.user_id === id)?.rank);
        } catch (err) {
          console.error('Fout bij ophalen leaderboarddetails:', err);
          alert('Fout bij ophalen van leaderboardgegevens');
        }
      }
    };

    fetchLeaderboardDetails();
  }, [leaderboardId]);

  if (!leaderboardId) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.errorText}>Leaderboard ID ontbreekt. Probeer opnieuw.</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/leaderboard')}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Leaderboard Details</Text>
          <TouchableOpacity>
            <FontAwesome name="share-alt" size={20} color="#29A86E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/invite')} style={styles.inviteButton}>
          <FontAwesome name="user-plus" size={18} color="#29A86E" style={{ marginRight: 8 }} />
          <Text style={styles.inviteText}>Vrienden uitnodigen</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {leaderboardData.map((user) => (
          <View
            key={user.user_id}
            style={[styles.card, user.user_id === userId && styles.activeCard]}
          >
            <Text style={styles.rank}>{user.rank}</Text>
            <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.days}>{user.total_puffs} puffs</Text>
            </View>
          </View>
        ))}
        {userRank && (
          <Text style={styles.yourRankText}>Jouw positie: #{userRank}</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Bevestiging',
            'Weet je zeker dat je dit leaderboard wilt verwijderen?',
            [
              { text: 'Annuleer', style: 'cancel' },
              {
                text: 'Verwijder',
                style: 'destructive',
                onPress: async () => {
                  try {
                    const res = await fetch(`${API_BASE_URL}/leaderboard/delete?leaderboardId=${leaderboardId}`, {
                      method: 'DELETE',
                    });

                    const data = await res.json();

                    if (res.ok) {
                      alert(data.message || 'Leaderboard verwijderd');
                      router.push('/leaderboard');
                    } else {
                      alert(data.error || 'Verwijderen mislukt');
                    }
                  } catch (err) {
                    console.error('Fout bij verwijderen:', err);
                    alert('Er is een fout opgetreden bij het verwijderen.');
                  }
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.deleteText}>Verwijder leaderboard</Text>
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
    paddingBottom: 0,
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
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    height: 53,
    marginBottom: 16,
  },
  inviteText: {
    fontSize: 18,
    color: '#29A86E',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E3E3E3',
    marginBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: '#E3E3E3',
    height: 80,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
  },
  activeCard: {
    backgroundColor: '#DFF5E5',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginHorizontal: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  days: {
    fontSize: 14,
    color: '#515151',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
  yourRankText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 12,
  },
  deleteButton: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#FF4D4D',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
