import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcomestart');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#29A86E" barStyle="light-content" />
      <Image
        source={require('../../assets/images/logoLarge.png')} // Zorg dat dit pad correct is
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
