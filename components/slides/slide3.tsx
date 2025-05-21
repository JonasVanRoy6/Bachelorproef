import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Slide3() {
  return (
    <View style={styles.container}>
      {/* Verberg statusbar-achtergrond zodat image tot aan rand komt */}
      <Image
        source={require('../../assets/images/journey3.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Daag jezelf en anderen uit</Text>
        <Text style={styles.subtitle}>
          Neem uitdagingen aan, nodig vrienden uit en strijd samen op het leaderboard. Samen stoppen is makkelijker én leuker!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: width,
    height: 494,
  },
  textWrapper: {
    paddingHorizontal: 36,
    marginTop: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#515151',
    lineHeight: 24,
  },
});
