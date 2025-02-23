import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TrackerScreen from '../TrackerScreen';
import AddPuffsScreen from '../screens/AddPuffsScreen';
import { PuffProvider } from '../screens/PuffContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PuffProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TrackerScreen" component={TrackerScreen} options={{ title: 'Tracker' }} />
          <Stack.Screen name="AddPuffsScreen" component={AddPuffsScreen} options={{ title: 'Puffs Toevoegen' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PuffProvider>
  );
}
