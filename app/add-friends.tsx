import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const allUsers = [
  {
    name: 'Andres',
    username: '@AndresCochez',
    img: require('../assets/images/andres.png'),
  },
  {
    name: 'Andres',
    username: '@AndresCrs',
    img: require('../assets/images/jonas.png'),
  },
  {
    name: 'Andres',
    username: '@AndresC531',
    img: require('../assets/images/lotte.png'),
  },
];

export default function AddFriendsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState<string[]>([]);

  const toggleAdd = (username: string) => {
    setAdded((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const filtered = allUsers.filter((user) =>
    `${user.name}${user.username}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Zoek vrienden</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <FontAwesome name="search" size={16} color="#515151" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Gebruikersnaam"
          placeholderTextColor="#515151"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <FontAwesome name="close" size={18} color="#29A86E" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results only shown if searching */}
      {search.length > 0 && (
        <>
          <Text style={styles.resultCount}>{filtered.length} resultaat{filtered.length !== 1 ? 'en' : ''}</Text>

          {filtered.map((user, index) => (
            <View key={index} style={styles.card}>
              <Image source={user.img} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>{user.username}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  added.includes(user.username) && styles.checkedButton,
                ]}
                onPress={() => toggleAdd(user.username)}
              >
                <FontAwesome
                  name={added.includes(user.username) ? 'check' : 'user-plus'}
                  size={16}
                  color={added.includes(user.username) ? '#29A86E' : '#29A86E'}
                />
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  content: {
    paddingHorizontal: 20,
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
});
