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
        source={require('../../assets/images/ImageSlide1.png')}
        style={styles.image}
        resizeMode="contain"
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
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,           // iets smaller dan schermbreedte
    height: height * 0.4,         // iets kleiner dan de helft van het scherm
    marginTop: 40,                // ruimte boven
    marginHorizontal: 20,         // marge links/rechts
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 36,
    paddingTop: 40,
    justifyContent: 'flex-start',
    width: '100%',
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
