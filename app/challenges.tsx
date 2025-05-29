import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../server/config';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ICONS = {
  reizen: <FontAwesome5 name="suitcase-rolling" size={24} color="#29A86E" />,
  kleding: <FontAwesome5 name="tshirt" size={24} color="#3ED9E2" />,
  voeding: (
    <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#FF7373" />
  ),
  elektronica: <FontAwesome5 name="mobile-alt" size={24} color="#7061BB" />,
  cadeau: <FontAwesome name="gift" size={24} color="#FFCD0F" />,
};

const kleuren = {
  reizen: '#29A86E',
  kleding: '#3ED9E2',
  voeding: '#FF7373',
  elektronica: '#7061BB',
  cadeau: '#FFCD0F',
};

const achtergrondKleurBox = {
  elektronica: '#EAE8F5',
  reizen: '#DFF2E9',
  kleding: '#E2FAFB',
  voeding: '#FFEAEA',
  cadeau: '#FFF8DB',
};

type Thema = keyof typeof kleuren;

type Challenge = {
  challenge_id: number;
  titel: string;
  thema: Thema;
  bedrag: number;
  huidig: number;
};

const Challenges = () => {
  const [actieve, setActieve] = useState<Challenge | null>(null);
  const [overige, setOverige] = useState<Challenge[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          alert('Kan de ingelogde gebruiker niet vinden.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/challenges?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          if (data.length > 0) {
            setActieve(data[0]);
            setOverige(data.slice(1));
          } else {
            setActieve(null);
            setOverige([]);
          }
        } else {
          alert(data.error || 'Fout bij het ophalen van uitdagingen.');
        }

        const savingsResponse = await fetch(`${API_BASE_URL}/calculate-savings?userId=${userId}`);
        const savingsData = await savingsResponse.json();

        if (savingsResponse.ok) {
          setTotalSaved(savingsData.totalSavings);
        } else {
          alert(savingsData.error || 'Fout bij het berekenen van besparingen.');
        }
      } catch (error) {
        console.error('Fout bij het ophalen van uitdagingen of besparingen:', error);
        alert('Kan geen verbinding maken met de server.');
      }
    };

    fetchChallenges();
  }, []);

  const maakActief = async (nieuw: Challenge) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('Kan de ingelogde gebruiker niet vinden.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/challenges/set-active`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, challengeId: nieuw.challenge_id }),
      });

      const data = await response.json();

      if (response.ok) {
        if (actieve && actieve.challenge_id !== nieuw.challenge_id) {
          setOverige((prev) => [actieve, ...prev.filter((u) => u.challenge_id !== nieuw.challenge_id)]);
        } else {
          setOverige((prev) => prev.filter((u) => u.challenge_id !== nieuw.challenge_id));
        }
        setActieve(nieuw);
      } else {
        alert(data.error || 'Fout bij het instellen van actieve uitdaging.');
      }
    } catch (error) {
      console.error('Fout bij het instellen van actieve uitdaging:', error);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  const getOpacityColor = (kleur: string) => kleur + '26';

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={actieve ? kleuren[actieve.thema] : '#29A86E'} barStyle="light-content" />
      <View style={[styles.topContainer, { backgroundColor: actieve ? kleuren[actieve.thema] : '#29A86E' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uitdagingen</Text>
          <View style={{ width: 24 }} />
        </View>

        {actieve && (
          <View style={styles.cardContainer}>
            <View style={[styles.challengeCard, { backgroundColor: achtergrondKleurBox[actieve.thema] || '#fff' }]}>
              <View style={styles.cardTop}>
                <View style={[styles.iconBox, { backgroundColor: getOpacityColor(kleuren[actieve.thema]) }]}>
                  {ICONS[actieve.thema]}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{actieve.titel}</Text>
                  <Text style={styles.subtitle}>Bespaar €{actieve.bedrag}</Text>
                </View>
                <View style={[styles.actiefTag, { backgroundColor: getOpacityColor(kleuren[actieve.thema]) }]}>
                  <Text style={[styles.actiefTagText, { color: kleuren[actieve.thema] }]}>Actief</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.progressLabel}>Progressie</Text>
                <Text style={[styles.progressValue, { color: kleuren[actieve.thema], fontWeight: '600' }]}>€{totalSaved} / €{actieve.bedrag}</Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: getOpacityColor(kleuren[actieve.thema]) }]}>
                <View style={[styles.progressBarFill, { width: `${Math.min((totalSaved / actieve.bedrag) * 100, 100)}%`, backgroundColor: kleuren[actieve.thema] }]} />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.scrollWrapper}>
        <View style={styles.overigeHeaderSticky}>
          <Text style={styles.overigeTitle}>Overige Uitdagingen</Text>
          <TouchableOpacity style={[styles.plusCircle, { backgroundColor: actieve ? kleuren[actieve.thema] : '#29A86E' }]} onPress={() => router.push('/challenges-add')}>
            <FontAwesome name="plus" size={16} color="#F5F5F5" />
          </TouchableOpacity>
        </View>

        {(actieve || overige.length > 0) ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
            {overige.map((item) => (
              <TouchableOpacity key={item.challenge_id} onPress={() => maakActief(item)} style={styles.challengeWrapper}>
                <View style={[styles.challengeCard, styles.overigeCard]}>
                  <View style={styles.cardTop}>
                    <View style={[styles.iconBox, { backgroundColor: getOpacityColor(kleuren[item.thema]) }]}>
                      {ICONS[item.thema]}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>{item.titel}</Text>
                      <Text style={styles.subtitle}>Bespaar €{item.bedrag}</Text>
                    </View>
                  </View>

                  <View style={[styles.cardBottom, { marginBottom: 8 }]}>
                    <Text style={styles.progressLabel}>Progressie</Text>
                    <Text style={[styles.progressValue, { color: kleuren[item.thema], fontWeight: '600' }]}>€{totalSaved} / €{item.bedrag}</Text>
                  </View>
                  <View style={[styles.progressBarBg, { backgroundColor: '#F5F5F5' }]}>
                    <View style={[styles.progressBarFill, { width: `${Math.min((totalSaved / item.bedrag) * 100, 100)}%`, backgroundColor: kleuren[item.thema] }]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: SCREEN_WIDTH * 0.1 }}>
            <Image source={require('../assets/images/ImageNoChallenges.png')} style={{ width: 220, height: 220, marginBottom: 20 }} resizeMode="contain" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#252525', marginBottom: 6, textAlign: 'center' }}>
              Nog geen uitdagingen
            </Text>
            <Text style={{ fontSize: 15, color: '#515151', textAlign: 'center', lineHeight: 22 }}>
              Voeg een uitdaging toe en begin met besparen!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContainer: {
    alignItems: 'center',
  },
  challengeWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  challengeCard: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
  },
  overigeCard: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
  },
  subtitle: {
    fontSize: 14,
    color: '#515151',
  },
  actiefTag: {
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actiefTagText: {
    fontSize: 14,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 14,
    color: '#515151',
  },
  progressValue: {
    fontSize: 14,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    borderRadius: 999,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 999,
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    marginTop: -82,
  },
  overigeHeaderSticky: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  overigeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252525',
  },
  plusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Challenges;
