import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instellingen</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionSpacing} />
        <TouchableOpacity style={styles.item} onPress={() => router.push('/accountsettings')}>
          <FontAwesome name="user" size={18} color="#29A86E" />
          <Text style={styles.label}>Accountinstellingen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        <Text style={styles.section}>TRACKING & GOALS</Text>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/connect-armband')}>
          <FontAwesome name="bluetooth" size={18} color="#29A86E" />
          <Text style={styles.label}>Verbind Armband</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        <Text style={styles.section}>MELDINGEN</Text>
        <View style={styles.item}>
          <FontAwesome name="bell" size={18} color="#29A86E" />
          <Text style={styles.label}>Pushmeldingen</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: '#29A86E' }}
            thumbColor="#fff"
          />
        </View>

        <Text style={styles.section}>ONDERSTEUNING & JURIDISCH</Text>
        <TouchableOpacity style={styles.item}>
          <FontAwesome name="headphones" size={18} color="#29A86E" />
          <Text style={styles.label}>Support</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/privacybeleid')} style={styles.item}>
          <FontAwesome name="shield" size={18} color="#29A86E" />
          <Text style={styles.label}>Privacybeleid</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/servicevoorwaarden')} style={styles.item}>
          <FontAwesome name="file" size={18} color="#29A86E" />
          <Text style={styles.label}>Servicevoorwaarden</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>

        <Text style={styles.section}>ACCOUNTACTIES</Text>
        <TouchableOpacity style={styles.item} onPress={() => setShowLogoutModal(true)}>
          <FontAwesome name="sign-out" size={18} color="#29A86E" />
          <Text style={styles.label}>Uitloggen</Text>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
          <FontAwesome name="trash" size={18} color="#EB5757" />
          <Text style={styles.deleteLabel}>Account verwijderen</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showDeleteModal || showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowDeleteModal(false);
          setShowLogoutModal(false);
        }}
      >
        <View style={styles.modalOverlayFullScreen}>
          <View style={styles.modalFullScreenContent}>
            <Image
              source={
                showDeleteModal
                  ? require('../assets/images/ImageDeleteAccount.png')
                  : require('../assets/images/ImageLogout.png')
              }
              style={styles.fullImage}
              resizeMode="contain"
            />

            <Text style={styles.modalTitle}>
              {showDeleteModal ? 'Account Verwijderen' : 'Uitloggen'}
            </Text>

            <Text style={styles.modalText}>
              {showDeleteModal
                ? 'Weet je zeker dat je je account wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt en al je voortgang zal verloren gaan.'
                : 'Weet je zeker dat je wilt uitloggen?'}
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={async () => {
                if (showDeleteModal) {
                  try {
                    const userId = await AsyncStorage.getItem('userId');
                    if (!userId) {
                      alert('Kan de ingelogde gebruiker niet vinden.');
                      return;
                    }

                    const response = await fetch(`${API_BASE_URL}/delete-account`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ userId }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                      alert('Account succesvol verwijderd.');
                      await AsyncStorage.removeItem('userId');
                      await AsyncStorage.removeItem('isLoggedIn'); // ⬅️ deze regel toevoegen
router.replace('/welcomestart');
                      router.replace('/welcomestart');
                    } else {
                      alert(data.error || 'Er is iets misgegaan bij het verwijderen van het account.');
                    }
                  } catch (error) {
                    console.error('Fout bij het verwijderen van het account:', error);
                    alert('Kan geen verbinding maken met de server.');
                  }
                } else if (showLogoutModal) {
                  try {
                    await AsyncStorage.removeItem('userId');
await AsyncStorage.removeItem('isLoggedIn'); // ⬅️ deze regel toevoegen
router.replace('/welcomestart');
                  } catch (error) {
                    console.error('Fout bij het uitloggen:', error);
                    alert('Er is iets misgegaan bij het uitloggen.');
                  }
                }
              }}
            >
              <Text style={styles.confirmButtonText}>
                {showDeleteModal ? 'Ja, Account Verwijderen' : 'Ja, Uitloggen'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowDeleteModal(false);
                setShowLogoutModal(false);
              }}
            >
              <Text style={styles.cancelButtonText}>
                {showDeleteModal ? 'Mijn Account Behouden' : 'Annuleren'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  scrollView: { flex: 1 },
  scrollContainer: { paddingBottom: 64 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
  },
  sectionSpacing: { height: 24 },
  section: {
    fontSize: 14,
    fontWeight: '500',
    color: '#515151',
    marginTop: 24,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#252525',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(235, 87, 87, 0.15)',
    borderWidth: 0.8,
    borderColor: 'rgba(235, 87, 87, 0.2)',
  },
  deleteLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#EB5757',
    flex: 1,
  },
  modalOverlayFullScreen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFullScreenContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  fullImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#515151',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#252525',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
