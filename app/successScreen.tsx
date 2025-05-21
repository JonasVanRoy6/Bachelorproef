import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Cirkel + Check */}
        <View style={styles.iconCircle}>
          <FontAwesome name="check" size={68} color="#29A86E" />
        </View>

        {/* Titel */}
        <Text style={styles.title}>Proficiat!</Text>

        {/* Subtekst */}
        <Text style={styles.subtitle}>
          Je account is aangemaakt. Je hebt de eerste stap gezet naar een vape-vrije toekomst. We zijn trots op je!
        </Text>

        {/* Knop */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/connectBraceletScreen')}
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
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(41, 168, 110, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
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
