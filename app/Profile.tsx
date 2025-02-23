import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const user = {
  name: 'Jelle De Boeck',
  username: '@jelle07011',
  profilePic: require("../assets/images/spongebob.png"),
  friends: [
    { id: '1', name: 'Jonas', image: require("../assets/images/jonas.png") },
    { id: '2', name: 'Arno', image: require("../assets/images/arno.png") },
    { id: '3', name: 'Lotte', image: require("../assets/images/lotte.png") },
  ],
  badges: [
    require("../assets/images/racket.png"),
    require("../assets/images/blad.png"),
    require("../assets/images/doel.png"),
    require("../assets/images/hand.png"),
  ],
  suggestedFriends: [
    { id: '4', name: 'Jens De Wachter', mutual: 3, image: require("../assets/images/jens.png") },
    { id: '5', name: 'Andres Cochez', mutual: 3, image: require("../assets/images/andres.png") },
  ],
 
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={user.profilePic} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
       
      </View>
      
      <Text style={styles.sectionTitle}>Mijn vrienden</Text>
      <FlatList
        horizontal
        data={user.friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={item.image} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
          </View>
        )}
      />
      
      <Text style={styles.sectionTitle}>Mijn badges</Text>
      <FlatList
        horizontal
        data={user.badges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.badgeImage} />
        )}
      />
      
      <Text style={styles.sectionTitle}>Voorgestelde vrienden</Text>
      <FlatList
        data={user.suggestedFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.suggestedFriendItem}>
            <Image source={item.image} style={styles.suggestedFriendImage} />
            <View>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.mutualFriends}>{item.mutual} gezamenlijke vrienden</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
             
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  username: { color: 'gray' },
  settingsIcon: { position: 'absolute', top: 10, right: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  friendItem: { alignItems: 'center', marginRight: 15 },
  friendImage: { width: 75, height: 75, borderRadius: 25 },
  friendName: { marginTop: 5, fontSize: 14 },
  badgeImage:{width:75, height: 75},
  badgesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  suggestedFriendItem: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  suggestedFriendImage: { width: 75, height: 75, borderRadius: 25, marginRight: 10 },
  mutualFriends: { color: 'gray', fontSize: 12 },
  addButton: { marginLeft: 'auto', backgroundColor: '#27ae60', padding: 10, borderRadius: 5 },
});

export default ProfileScreen;
