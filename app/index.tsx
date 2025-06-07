// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { isLoggedIn } from '../auth/auth'; // 👈 importeer de login-check

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const checkLoginAndRedirect = async () => {
      const loggedIn = await isLoggedIn();
      setTimeout(() => {
        if (loggedIn) {
          router.replace('/home');
        } else {
          router.replace('/welcomestart');
        }
        setAuthChecked(true);
      }, 2000); // iets snellere loader
    };

    if (fontsLoaded) {
      checkLoginAndRedirect();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !authChecked) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
        <Image
          source={require('../assets/images/logoLarge.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }

  return null; // 👈 dit scherm toont verder niks zodra redirect is gedaan
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.2,
  },
});
