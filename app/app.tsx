import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen'; // Importeer het LoginScreen

// Definieer de typen voor de navigatieroutes
type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined; // Voeg de Login-route toe
};

const Stack = createStackNavigator<RootStackParamList>();

// Typen voor de HomeScreen props
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-image-url.png' }} // Vervang met de URL van je afbeelding
        style={styles.image}
      />
      <Text style={styles.title}>Breezd</Text>
      <Text style={styles.description}>
        Elke dag een stap vooruit. Track je gebruik, stel doelen, en bouw aan een vape-vrije toekomst die je verdient.
      </Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')} // Navigeer naar de 'Register'-route
      >
        <Text style={styles.registerButtonText}>Registreren</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Al een account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registreren' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Inloggen' }} /> 
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00A86B',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#555555',
  },
  loginLink: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
});