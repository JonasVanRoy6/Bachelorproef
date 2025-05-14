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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const avatarMap: Record<string, any> = {
  'andres.png': require('../../assets/images/andres.png'),
  'jens.png': require('../../assets/images/jens.png'),
  'jonas.png': require('../../assets/images/jonas.png'),
  'arno.png': require('../../assets/images/arno.png'),
  'lotte.png': require('../../assets/images/lotte.png'),
};

const leaderboardsData = [
  {
    name: 'The boys',
    participants: 7,
    rank: 2,
    avatars: ['andres.png', 'jens.png', 'jonas.png'],
    joined: true,
  },
  {
    name: 'LonderzeelOnTop',
    participants: 4,
    avatars: ['arno.png', 'lotte.png'],
    joined: false,
  },
];

const LeaderboardScreen = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { created } = useLocalSearchParams();
  const [showSuccess, setShowSuccess] = useState(created === 'true');

  useEffect(() => {
    if (created === 'true') {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [created]);

  const filtered = leaderboardsData.filter(lb =>
    search.length > 0 ? lb.name.toLowerCase().includes(search.toLowerCase()) : lb.joined
  );

  const createLeaderboard = async () => {
    try {
      const userId = await getUserId();

      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
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
          friends: selectedFriends, // Stuur de geselecteerde vrienden mee
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);

        // Voeg het nieuwe leaderboard toe aan de lijst
        const newLeaderboard = {
          name: data.name,
          participants: selectedFriends.length,
          rank: leaderboardsData.length + 1, // Voeg een nieuwe rank toe
          avatars: selectedFriends.map(friend => friend.avatar || 'default.png'), // Voeg avatars toe
          joined: true,
        };

        leaderboardsData.unshift(newLeaderboard); // Voeg het nieuwe leaderboard toe aan de lijst

        // Navigeer naar het leaderboard-scherm
        router.push('/leaderboard');
      } else {
        alert(data.error || 'Er is iets misgegaan bij het aanmaken van het leaderboard.');
      }
    } catch (error) {
      console.error('Fout bij het aanmaken van het leaderboard:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Leaderboards</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mijn leaderboards</Text>
          <TouchableOpacity>
            <Text
              onPress={() => router.push('/leaderboard-create')}
              style={styles.addLink}
            >
              + Toevoegen
            </Text>
          </TouchableOpacity>
        </View>

        {leaderboardsData.filter(lb => lb.joined).map((lb, index) => (
          <TouchableOpacity
            key={index}
            style={styles.joinedCard}
            onPress={() => router.push('/leaderboarddetails')}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{lb.name}</Text>
              <View style={styles.rankBadge}><Text style={styles.rankText}>#{lb.rank}</Text></View>
            </View>
            <View style={styles.spacer12} />
            <View style={styles.avatarRow}>
              {lb.avatars.map((img, i) => (
                <Image
                  key={i}
                  source={avatarMap[img]}
                  style={styles.avatar}
                />
              ))}
              <Text style={styles.participantText}>{lb.participants} deelnemers</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Join een leaderboard</Text>

        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={16} color="#515151" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Geef een leaderboardcode in"
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

        {filtered.filter(lb => !lb.joined).map((lb, index) => (
          <View key={index} style={styles.searchResultCard}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{lb.name}</Text>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinText}>Deelnemen</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.avatarRow}>
              {lb.avatars.map((img, i) => (
                <Image
                  key={i}
                  source={avatarMap[img]}
                  style={styles.avatar}
                />
              ))}
              <Text style={styles.participantText}>{lb.participants} deelnemers</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {showSuccess && (
        <View style={styles.successBanner}>
          <FontAwesome name="check" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.successText}>Leaderboard succesvol aangemaakt!</Text>
          <TouchableOpacity onPress={() => setShowSuccess(false)}>
            <FontAwesome name="times" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    fontWeight: 'bold'
  },
  joinedCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    height: 107,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    marginTop: 10,
  },
  searchResultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    height: 82,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    marginTop: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000'
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
  spacer12: {
    height: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 32,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  participantText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#555'
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
    color: '#29A86E'
  },
  joinButton: {
    backgroundColor: '#29A86E',
    borderRadius: 6,
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  joinText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: 'bold'
  },
  successBanner: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#29A86E',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },  
  successText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  }
});

export default LeaderboardScreen;
