import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* ✅ Afbeelding in plaats van check-circle */}
        <Image
          source={require('../assets/images/ImageAccountMade.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Titel */}
        <Text style={styles.title}>Proficiat!</Text>

        {/* Subtekst */}
        <Text style={styles.subtitle}>
          Je account is aangemaakt. Een mooie stap vooruit, we zijn trots op je!
        </Text>

        {/* Knop */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/startJourneyScreen')}
        >
          <Text style={styles.buttonText}>Volgende</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#515151',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 36,
  },
  button: {
    backgroundColor: '#29A86E',
    borderRadius: 16,
    width: '100%',
    maxWidth: 330,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
});
