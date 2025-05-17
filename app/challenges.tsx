import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';

const ICONS = {
  reizen: <FontAwesome5 name="suitcase-rolling" size={24} color="#29A86E" />,
  kleding: <FontAwesome5 name="tshirt" size={24} color="#3ED9E2" />,
  voeding: (
    <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#FF7373" />
  ),
  elektronica: <FontAwesome5 name="mobile-alt" size={24} color="#7061BB" />,
  cadeau: <FontAwesome name="gift" size={24} color="#FFCD0F" />,
} as const;

const kleuren = {
  reizen: '#29A86E',
  kleding: '#3ED9E2',
  voeding: '#FF7373',
  elektronica: '#7061BB',
  cadeau: '#FFCD0F',
} as const;

const achtergrondKleurBox = {
  elektronica: '#EAE8F5',
  reizen: '#DFF2E9',
  kleding: '#E2FAFB',
  voeding: '#FFEAEA',
  cadeau: '#FFF8DB',
} as const;

type Thema = keyof typeof kleuren;

type Challenge = {
  id: number;
  titel: string;
  thema: Thema;
  bedrag: number;
  huidig: number;
  menuOpen?: boolean;
};

const initActief: Challenge = {
  id: 1,
  titel: 'Nieuwe Iphone',
  thema: 'elektronica',
  bedrag: 310,
  huidig: 190,
};

const initOverige: Challenge[] = [
  { id: 2, titel: 'Vakantie Naar Spanje', thema: 'reizen', bedrag: 350, huidig: 30 },
  { id: 3, titel: 'Nieuwe Trui', thema: 'kleding', bedrag: 45, huidig: 40 },
  { id: 4, titel: 'Uit Eten Gaan', thema: 'voeding', bedrag: 60, huidig: 5 },
  { id: 5, titel: 'Cadeautje Kopen', thema: 'cadeau', bedrag: 60, huidig: 5 },
];

const Challenges = () => {
  const [actieve, setActieve] = useState<Challenge>(initActief);
  const [overige, setOverige] = useState<Challenge[]>(initOverige);

  const maakActief = (nieuw: Challenge) => {
    setOverige((prev) => [
      ...prev.filter((u) => u.id !== nieuw.id),
      { ...actieve, menuOpen: false },
    ]);
    setActieve(nieuw);
  };

  const getOpacityColor = (kleur: string) => kleur + '26';

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={kleuren[actieve.thema]}
        barStyle="light-content"
      />
      <View
        style={[styles.topContainer, { backgroundColor: kleuren[actieve.thema] }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Uitdagingen</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.cardContainer}>
          <View
            style={[
              styles.challengeCard,
              {
                backgroundColor:
                  achtergrondKleurBox[actieve.thema] || '#fff',
              },
            ]}
          >
            <View style={styles.cardTop}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: getOpacityColor(
                      kleuren[actieve.thema]
                    ),
                  },
                ]}
              >
                {ICONS[actieve.thema]}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{actieve.titel}</Text>
                <Text style={styles.subtitle}>Bespaar €{actieve.bedrag}</Text>
              </View>
              <View
                style={[
                  styles.actiefTag,
                  {
                    backgroundColor: getOpacityColor(kleuren[actieve.thema]),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.actiefTagText,
                    { color: kleuren[actieve.thema] },
                  ]}
                >
                  Actief
                </Text>
              </View>
            </View>
            <View style={[styles.cardBottom, { marginBottom: 8 }]}>
              <Text style={styles.progressLabel}>Progressie</Text>
              <Text
                style={[
                  styles.progressValue,
                  {
                    color: kleuren[actieve.thema],
                    fontWeight: '600',
                  },
                ]}
              >
                €{actieve.huidig} / €{actieve.bedrag}
              </Text>
            </View>
            <View
              style={[
                styles.progressBarBg,
                {
                  backgroundColor: getOpacityColor(kleuren[actieve.thema]),
                },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${
                      (actieve.huidig / actieve.bedrag) * 100
                    }%`,
                    backgroundColor: kleuren[actieve.thema],
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.scrollWrapper}>
        <View style={styles.overigeHeaderSticky}>
          <Text style={styles.overigeTitle}>Overige Uitdagingen</Text>
          <TouchableOpacity
            style={[
              styles.plusCircle,
              { backgroundColor: kleuren[actieve.thema] },
            ]}
            onPress={() => router.push('/challenges-add')}
          >
            <FontAwesome name="plus" size={16} color="#F5F5F5" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
          {overige.map((item) => (
            <View key={item.id} style={styles.challengeWrapper}>
              <View
                style={[
                  styles.challengeCard,
                  styles.overigeCard,
                  { backgroundColor: '#fff' },
                ]}
              >
                <View style={styles.cardTop}>
                  <View
                    style={[
                      styles.iconBox,
                      {
                        backgroundColor: getOpacityColor(
                          kleuren[item.thema]
                        ),
                      },
                    ]}
                  >
                    {ICONS[item.thema]}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.titel}</Text>
                    <Text style={styles.subtitle}>Bespaar €{item.bedrag}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setOverige((prev) =>
                        prev.map((o) =>
                          o.id === item.id
                            ? { ...o, menuOpen: !o.menuOpen }
                            : { ...o, menuOpen: false }
                        )
                      );
                    }}
                  >
                    <Feather name="more-vertical" size={24} color="#515151" />
                  </TouchableOpacity>
                </View>

                {item.menuOpen && (
                  <View style={styles.popupMenu}>
                    <TouchableOpacity
                      onPress={() => maakActief(item)}
                      style={styles.popupOption}
                    >
                      <Text style={styles.popupText}>Maak Actief</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.popupOption}>
                      <Text style={[styles.popupText, { color: '#999' }]}>
                        Verwijder
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={[styles.cardBottom, { marginBottom: 8 }]}>
                  <Text style={styles.progressLabel}>Progressie</Text>
                  <Text
                    style={[
                      styles.progressValue,
                      {
                        color: kleuren[item.thema],
                        fontWeight: '600',
                      },
                    ]}
                  >
                    €{item.huidig} / €{item.bedrag}
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressBarBg,
                    { backgroundColor: '#F5F5F5' },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${(item.huidig / item.bedrag) * 100}%`,
                        backgroundColor: kleuren[item.thema],
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupMenu: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 999,
  },
  popupOption: {
    paddingVertical: 6,
  },
  popupText: {
    fontSize: 14,
    color: '#252525',
  },
  divider: {
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 6,
  },
  topContainer: {
    paddingTop: 64,
    paddingHorizontal: 24,
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
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  challengeCard: {
    width: 370,
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
    width: 338,
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
    overflow: 'hidden',
    marginTop: -82,
  },
  overigeHeaderSticky: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
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
