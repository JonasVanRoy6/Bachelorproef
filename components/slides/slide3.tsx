import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Slide3() {
  return (
    <View style={styles.container}>
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
    width: width,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: height * 0.5,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 36,
    paddingTop: 40,
    justifyContent: 'flex-start',
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
