import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const AccountSettingsScreen = () => {
  const [firstName, setFirstName] = useState('Tester');
  const [lastName, setLastName] = useState('Achternaam');
  const [email, setEmail] = useState('test1@gmail.com');
  const [birthDate, setBirthDate] = useState('14 / 01 / 2003');
  const [password] = useState('******');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accountinstellingen</Text>
        <View style={{ width: 24 }} />
      </View>

        {/* Naamvelden */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Voornaam</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Achternaam</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
        </View>

        {/* E-mailadres */}
        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>E-mailadres</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Geboortedatum */}
        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Geboortedatum</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>
        </View>

        {/* Wachtwoord */}
        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Wachtwoord</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry
              editable={false}
            />
            <TouchableOpacity style={styles.showButton}>
              <Text style={styles.toonText}>Toon</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nieuw wachtwoord */}
        <View style={styles.inputGroupFull}>
          <Text style={styles.label}>Nieuw Wachtwoord</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={styles.input}
              placeholder="Geef je nieuw wachtwoord in"
              placeholderTextColor="#515151"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.showButton}>
              <Text style={styles.toonText}>Toon</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Opslaan knop */}
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.button}>
          <Text style={styles.buttonText}>Wijzigingen opslaan</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64, paddingHorizontal: 20 },
  scrollContainer: { paddingBottom: 82 },
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
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  row: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  inputGroup: { flex: 1 },
  inputGroupFull: { marginBottom: 24 },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#252525',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    fontFamily: 'Poppins',
    padding: 0,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 12,
  },
  showButton: { marginLeft: 'auto' },
  toonText: {
    fontSize: 14,
    color: '#29A86E',
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#29A86E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

export default AccountSettingsScreen;
