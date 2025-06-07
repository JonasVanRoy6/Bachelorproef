// /auth/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async () => {
  await AsyncStorage.setItem('isLoggedIn', 'true');
};

export const logout = async () => {
  await AsyncStorage.removeItem('isLoggedIn');
};

export const isLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem('isLoggedIn');
  return value === 'true';
};
