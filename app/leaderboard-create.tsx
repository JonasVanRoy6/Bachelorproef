import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';

const initialFriends = [
  { name: 'Andres', username: '@AndresCochez', img: require('../assets/images/andres.png') },
  { name: 'Jonas', username: '@JonasVR', img: require('../assets/images/jonas.png') },
];

export default function CreateLeaderboardScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [friends, setFriends] = useState(initialFriends); // voorlopig hardcoded

  const removeFriend = (username: string) => {
    setFriends(prev => prev.filter(f => f.username !== username));
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

        {friends.map(friend => (
          <View key={friend.username} style={styles.friendCard}>
            <View style={styles.friendInfo}>
              <Image source={friend.img} style={styles.avatar} />
              <View>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendUsername}>{friend.username}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFriend(friend.username)}>
              <FontAwesome name="times" size={20} color="#29A86E" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push('/leaderboard?created=true')}
        style={styles.createButton}
      >
        <Text style={styles.createText}>Leaderboard aanmaken</Text>
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
});
