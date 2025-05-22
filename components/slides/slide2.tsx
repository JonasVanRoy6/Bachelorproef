import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
