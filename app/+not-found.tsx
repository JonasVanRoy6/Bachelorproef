import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

const NotFoundScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Oops! Page not found.</ThemedText>
      <ThemedText type="body">Sorry, the page you're looking for doesn't exist.</ThemedText>
      <Link href="/screens/HomeScreen" style={styles.link}>
        <ThemedText type="link">Go to Home</ThemedText>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default NotFoundScreen;
