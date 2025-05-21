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

export default function Slide2() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/journey2.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Ontdek je voortgang</Text>
        <Text style={styles.subtitle}>
          Bekijk je stats zoals bespaard geld, verbeterde gezondheid en gemiddelde puffs per week. Milestones houden je gemotiveerd!
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
