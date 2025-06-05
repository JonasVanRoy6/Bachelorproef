import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Fonts laden
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
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace('/welcomestart');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <Image
        source={require('../assets/images/logoLarge.png')} // 📌 Zorg dat dit pad klopt
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
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
