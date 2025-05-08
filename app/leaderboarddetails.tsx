import React from 'react';
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

const leaderboardData = [
  { rank: 1, name: 'Andres', days: 14, img: require('../assets/images/andres.png'), badge: 'trophy', badgeColor: '#FFD700' },
  { rank: 2, name: 'Jelle', days: 12, img: require('../assets/images/spongebob.png'), badge: 'trophy', badgeColor: '#B0B0B0', active: true },
  { rank: 3, name: 'Jonas', days: 10, img: require('../assets/images/jonas.png'), badge: 'trophy', badgeColor: '#CD7F32' },
  { rank: 4, name: 'Arno', days: 8, img: require('../assets/images/arno.png') },
  { rank: 4, name: 'Lotte', days: 8, img: require('../assets/images/lotte.png') },
  { rank: 5, name: 'Jens', days: 6, img: require('../assets/images/andres.png'), badge: 'user' },
  { rank: 6, name: 'Kim', days: 2, img: require('../assets/images/jens.png'), badge: 'user' },
];

export default function LeaderboardDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/leaderboard')}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>The Boys</Text>
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
            style={[styles.card, user.active && styles.activeCard]}
          >
            <Text style={styles.rank}>{user.rank}</Text>
            <Image source={user.img} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.days}>{user.days} dagen onder doel</Text>
            </View>
            {typeof user.badge === 'string' && (
              <FontAwesome
                name={user.badge}
                size={20}
                color={user.badgeColor || '#29A86E'}
                style={styles.badge}
              />
            )}
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
});
