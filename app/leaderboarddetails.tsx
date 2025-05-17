import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LeaderboardDetailsScreen() {
  const router = useRouter();
  const leaderboardId = router.query?.leaderboardId; // Haal de leaderboardId op uit de queryparameters
  const [leaderboardData, setLeaderboardData] = useState([]);

  console.log('Ontvangen leaderboardId:', leaderboardId);

  const fetchLeaderboardDetails = async () => {
    try {
      const response = await fetch(`http://192.168.0.105:5000/leaderboard/details?leaderboardId=${leaderboardId}`);
      const data = await response.json();

      if (response.ok) {
        setLeaderboardData(data); // Stel de opgehaalde gegevens in de state in
      } else {
        alert(data.error || 'Er is iets misgegaan bij het ophalen van leaderboarddetails.');
      }
    } catch (error) {
      console.error('Fout bij het ophalen van leaderboarddetails:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  useEffect(() => {
    if (leaderboardId) {
      fetchLeaderboardDetails();
    }
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
        {leaderboardData.map((user, index) => (
          <View
            key={index}
            style={[styles.card, user.user_id === userId && styles.activeCard]} // Highlight de ingelogde gebruiker
          >
            <Text style={styles.rank}>{user.rank}</Text>
            <Image source={require('../assets/images/andres.png')} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.days}>{user.total_puffs} puffs</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  badge: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
});
