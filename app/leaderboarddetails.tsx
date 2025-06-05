import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

export default function LeaderboardDetailsScreen() {
  const router = useRouter();
  const { leaderboardId } = useLocalSearchParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

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
          setIsOwner(data.isOwner);
        } catch (err) {
          console.error('Fout bij ophalen leaderboarddetails:', err);
          alert('Fout bij ophalen van leaderboardgegevens');
        }
      }
    };

    fetchLeaderboardDetails();
  }, [leaderboardId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leaderboard/delete?leaderboardId=${leaderboardId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Leaderboard verwijderd');
        setShowDeletePopup(false);
        router.push('/leaderboard');
      } else {
        alert(data.error || 'Verwijderen mislukt');
      }
    } catch (err) {
      console.error('Fout bij verwijderen:', err);
      alert('Er is een fout opgetreden bij het verwijderen.');
    }
  };

  const leaveLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leaderboard/leave`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, leaderboardId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Je hebt het leaderboard verlaten.');
        setShowLogoutPopup(false);
        router.push('/leaderboard');
      } else {
        alert(data.error || 'Fout bij het verlaten van het leaderboard.');
      }
    } catch (err) {
      console.error('Fout bij het verlaten van het leaderboard:', err);
      alert('Kan geen verbinding maken met de server.');
    }
  };

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
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/leaderboard')}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Leaderboard Details</Text>
          <TouchableOpacity onPress={() => setShowLogoutPopup(true)}>
            <FontAwesome name="sign-out" size={20} color="#29A86E" />
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
            {user.rank <= 3 && (
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    user.rank === 1
                      ? 'rgba(255, 205, 15, 0.15)'
                      : user.rank === 2
                      ? 'rgba(81, 81, 81, 0.15)'
                      : 'rgba(168, 122, 38, 0.15)',
                }}
              >
                <FontAwesome
                  name="trophy"
                  size={20}
                  color={
                    user.rank === 1
                      ? '#FFCD0F'
                      : user.rank === 2
                      ? '#515151'
                      : '#A87A26'
                  }
                />
              </View>
            )}
          </View>
        ))}
        {userRank && (
          <Text style={styles.yourRankText}>Jouw positie: #{userRank}</Text>
        )}
      </ScrollView>

      {isOwner && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowDeletePopup(true)}
        >
          <Text style={styles.deleteText}>Verwijder leaderboard</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={showDeletePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeletePopup(false)}
      >
        <View style={styles.modalOverlayFullScreen}>
          <View style={styles.modalFullScreenContent}>
            <Image
              source={require('../assets/images/ImageDeleteAccount.png')}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Text style={styles.fullTitle}>Leaderboard verwijderen?</Text>
            <Text style={styles.fullText}>
              Je staat op het punt om dit leaderboard definitief te verwijderen. Weet je het zeker?
            </Text>

            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.continueButton, { backgroundColor: '#EB5757' }]}
            >
              <Text style={[styles.continueButtonText, { color: '#fff' }]}>Ja, verwijder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowDeletePopup(false)}
              style={[styles.continueButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E3E3E3', marginTop: 12 }]}
            >
              <Text style={[styles.continueButtonText, { color: '#252525' }]}>Annuleer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLogoutPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutPopup(false)}
      >
        <View style={styles.modalOverlayFullScreen}>
          <View style={styles.modalFullScreenContent}>
            <Image
              source={require('../assets/images/ImageLogout.png')}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <Text style={styles.fullTitle}>Leaderboard verlaten?</Text>
            <Text style={styles.fullText}>
              Je staat op het punt om dit leaderboard te verlaten. Weet je het zeker?
            </Text>

            <TouchableOpacity
              onPress={leaveLeaderboard}
              style={[styles.continueButton, { backgroundColor: '#EB5757' }]}
            >
              <Text style={[styles.continueButtonText, { color: '#fff' }]}>Ja, verlaat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowLogoutPopup(false)}
              style={[styles.continueButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E3E3E3', marginTop: 12 }]}
            >
              <Text style={[styles.continueButtonText, { color: '#252525' }]}>Annuleer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { paddingTop: 64, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    height: 53,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inviteText: { fontSize: 18, color: '#29A86E', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E3E3E3' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
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
    gap: 8,
  },
  activeCard: { backgroundColor: '#DFF5E5' },
  rank: { fontSize: 18, fontWeight: 'bold', width: 24, textAlign: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  userInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  days: { fontSize: 14, color: '#515151' },
  errorText: { fontSize: 16, color: '#FF0000', textAlign: 'center', marginTop: 20 },
  yourRankText: { fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginTop: 12 },
  deleteButton: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#EB5757',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlayFullScreen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFullScreenContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  fullImage: { width: 180, height: 180, marginBottom: 24 },
  fullTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
    textAlign: 'center',
  },
  fullText: {
    fontSize: 16,
    color: '#515151',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  continueButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});