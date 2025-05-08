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

const allUsers = [
  { name: 'Jens', username: '@JensDeW', img: require('../assets/images/andres.png'), invited: false, recommended: true },
  { name: 'Lotte', username: '@Lottex4', img: require('../assets/images/lotte.png'), invited: false, recommended: true },
  { name: 'Milan', username: '@MilanS', img: require('../assets/images/jonas.png'), invited: true },
  { name: 'Arno', username: '@ArnoVanCalster', img: require('../assets/images/arno.png'), invited: false },
  { name: 'Andres', username: '@AndresCochez', img: require('../assets/images/andres.png'), invited: false },
];

export default function InviteScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(allUsers);

  const handleInvite = (username: string) => {
    setUsers(prev =>
      prev.map(u => u.username === username ? { ...u, invited: !u.invited } : u)
    );
  };

  const filtered = users.filter(u =>
    search.length === 0 || u.name.toLowerCase().includes(search.toLowerCase())
  );

  const recommended = filtered.filter(u => u.recommended);
  const other = filtered.filter(u => !u.recommended);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Vrienden Uitnodigen</Text>
          <View style={{ width: 24 }} /> {/* Voor centrering */}
        </View>

        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={18} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Gebruikersnaam"
            placeholderTextColor="#515151"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FontAwesome name="times-circle" size={18} color="#29A86E" />
            </TouchableOpacity>
          )}
        </View>

        {search.length > 0 ? (
          <>
            <Text style={styles.resultCount}>{filtered.length} resultaat{filtered.length !== 1 ? 'en' : ''}</Text>
            <ScrollView contentContainerStyle={styles.list}>
              {filtered.map(user => (
                <UserCard key={user.username} user={user} onToggle={handleInvite} />
              ))}
            </ScrollView>
          </>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            <Text style={styles.section}>Aanbevolen</Text>
            {recommended.map(user => (
              <UserCard key={user.username} user={user} onToggle={handleInvite} />
            ))}
            <Text style={styles.section}>Vriendenlijst</Text>
            {other.map(user => (
              <UserCard key={user.username} user={user} onToggle={handleInvite} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

function UserCard({ user, onToggle }: { user: any; onToggle: (u: string) => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Image source={user.img} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={user.invited ? styles.invitedButton : styles.inviteButton}
        onPress={() => onToggle(user.username)}
      >
        <Text style={user.invited ? styles.invitedText : styles.inviteText}>
          {user.invited ? 'Uitgenodigd' : 'Uitnodigen'}
        </Text>
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
    flex: 1,
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
    color: '#000',
  },
  resultCount: {
    fontSize: 14,
    color: '#515151',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 40,
  },
  section: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    color: '#515151',
  },
  inviteButton: {
    backgroundColor: '#fff',
    borderColor: '#29A86E',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  inviteText: {
    fontSize: 14,
    color: '#29A86E',
    fontWeight: '600',
  },
  invitedButton: {
    backgroundColor: '#29A86E',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  invitedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
