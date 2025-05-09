import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const initialFriends = [
  {
    name: 'Jonas',
    username: '@JonasVR',
    img: require('../assets/images/jonas.png'),
    added: true,
  },
  {
    name: 'Lotte',
    username: '@Lotte3690',
    img: require('../assets/images/lotte.png'),
    added: true,
  },
  {
    name: 'Arno',
    username: '@ArnoVanCalster',
    img: require('../assets/images/arno.png'),
    added: true,
  },
];

export default function FriendsListScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState(initialFriends);

  const toggleFriend = (index: number) => {
    const updated = [...friends];
    updated[index].added = !updated[index].added;
    setFriends(updated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vrienden</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Friend Cards */}
      <View style={styles.friendList}>
        {friends.map((friend, index) => (
          <View key={index} style={styles.friendCard}>
            <Image source={friend.img} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{friend.name}</Text>
              <Text style={styles.username}>{friend.username}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.actionButton,
                friend.added && styles.checkedButton,
              ]}
              onPress={() => toggleFriend(index)}
            >
              <FontAwesome
                name={friend.added ? 'check' : 'user-plus'}
                size={16}
                color={friend.added ? '#29A86E' : '#29A86E'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Toevoegen link */}
      <TouchableOpacity style={styles.addLink} onPress={() => router.push('/add-friends')}>
        <Text style={styles.addText}>VRIENDEN TOEVOEGEN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
  },
  friendList: {
    gap: 12,
    marginBottom: 24,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
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
  addLink: {
    alignItems: 'center',
    marginTop: 12,
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#29A86E',
  },
});
