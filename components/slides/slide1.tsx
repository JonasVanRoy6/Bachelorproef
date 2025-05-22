import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Slide1() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/journey.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Start je journey</Text>
        <Text style={styles.subtitle}>
          Track je dagelijkse puffs, stel persoonlijke doelen in en begin met het opbouwen van jouw vape-vrije streak. Elke stap telt!
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
    height: height * 0.5, // responsive hoogte (50% van schermhoogte)
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
