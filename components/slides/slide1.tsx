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
