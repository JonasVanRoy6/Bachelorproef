import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width > 360 ? 330 : width - 72; // responsive: 36px padding aan beide kanten

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Illustratie bovenaan */}
      <Image
        source={require('../../assets/images/ImageAccountMade.png')} // Zorg dat dit pad klopt
        style={styles.mainImage}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logoBreezd.png')} // Zorg dat dit pad klopt
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Elke dag een stap vooruit. Track je gebruik, stel doelen, en bouw aan een vape-vrije toekomst die je verdient.
        </Text>

        {/* Registreren knop */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerText}>Registreren</Text>
        </TouchableOpacity>

        {/* Login link */}
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
  },
  mainImage: {
    width: '100%',
    height: 320,
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 36,
    alignItems: 'flex-start',
  },
  logo: {
    width: 160,
    height: 40,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#515151',
    marginBottom: 64,
  },
  registerButton: {
    width: BUTTON_WIDTH,
    height: 53,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  registerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  loginRow: {
    flexDirection: 'row',
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
