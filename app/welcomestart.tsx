import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const BUTTON_WIDTH = width > 360 ? 330 : width - 72;

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#C8E8D9" />

      {/* Volledig brede afbeelding zonder marge */}
      <Image
        source={require('../assets/images/ImageWelcome.png')}
        style={styles.welcomeImage}
        resizeMode="cover"
      />

      {/* Contentblok */}
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logoBreezd.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Uitlegtekst */}
        <Text style={styles.subtitle}>
          Elke dag een stap vooruit. Track je gebruik, stel je eigen doelen, en werk op jouw manier aan een gezondere relatie met vapen.
        </Text>
      </View>

      {/* Onderste gedeelte */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerText}>Registreren</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Al een account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  welcomeImage: {
    width: '100%',
    height: Math.min(height * 0.50, 494), // responsieve hoogte
    marginTop: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  content: {
    paddingHorizontal: 36,
  },
  logo: {
    width: 125,
    height: 32,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    color: '#515151',
    maxWidth: 330,
    textAlign: 'left',
    marginBottom: 64,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  registerButton: {
    width: BUTTON_WIDTH,
    height: 53,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24, // afstand tot login tekst
  },
  registerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#252525',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#29A86E',
  },
});
