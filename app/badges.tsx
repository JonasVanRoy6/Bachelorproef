import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Badge = {
  name: string;
  icon: string;
  achieved: boolean;
  color?: string;
};

const badgeList: Badge[] = [
  { name: 'First Step Hero', icon: 'rocket', achieved: true, color: '#29A86E' },
  { name: 'Groene Dag', icon: 'leaf', achieved: true, color: '#29A86E' },
  { name: 'Perfecte Week', icon: 'calendar', achieved: false },
  { name: 'Maand Meester', icon: 'trophy', achieved: false },
  { name: 'Doel Starter', icon: 'bullseye', achieved: true, color: '#FF7373' },
  { name: 'Doel Verpletteraar', icon: 'hand-rock-o', achieved: false },
  { name: 'Uitdaging Behaald', icon: 'flag-checkered', achieved: false },
  { name: 'Dagen Gewonnen', icon: 'clock-o', achieved: false },
  { name: 'Adem Vrijheid', icon: 'cut', achieved: false },
  { name: 'Gezonde Gewoonten', icon: 'heart', achieved: false },
  { name: 'Sociale Kampioen', icon: 'users', achieved: false },
  { name: 'Vape Buddy', icon: 'fingerprint', achieved: true, color: '#29A86E' },
];

export default function BadgesScreen() {
  const router = useRouter();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const earned = badgeList.filter((b) => b.achieved).length;
  const total = badgeList.length;
  const progress = Math.round((earned / total) * 100);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="#29A86E" />
          </TouchableOpacity>
          <Text style={styles.title}>Mijn Badges</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressCard}>
          <View>
            <Text style={styles.progressTitle}>Jouw Progressie</Text>
            <Text style={styles.progressSub}>
              {earned} van {total} badges verdiend
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {badgeList.map((badge, index) => {
            const achieved = badge.achieved;
            const fullOpacity = achieved ? 1 : 0.65;
            const iconColor = achieved ? badge.color : '#515151';
            const circleBg =
              achieved && iconColor
                ? `${iconColor}4D`
                : '#5151514D';

            return (
              <TouchableOpacity
                key={index}
                style={[styles.badgeCard, { opacity: fullOpacity }]}
                onPress={() => setSelectedBadge(badge)}
              >
                <View style={[styles.badgeCircle, { backgroundColor: circleBg }]}>
                  <FontAwesome name={badge.icon as any} size={20} color={iconColor} />
                </View>
                <Text style={styles.badgeLabel}>
                  {badge.name.split(' ').join('\n')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {selectedBadge && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedBadge.name}</Text>
                <TouchableOpacity onPress={() => setSelectedBadge(null)}>
                  <FontAwesome name="close" size={24} color="#29A86E" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalInfoRow}>
                <View
                  style={[
                    styles.modalIconCircle,
                    { backgroundColor: `${selectedBadge.color || '#515151'}4D` },
                  ]}
                >
                  <FontAwesome
                    name={selectedBadge.icon as any}
                    size={36}
                    color={selectedBadge.color || '#515151'}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.modalDate}>Verdiend op 8 jan 2025</Text>
                  <Text style={styles.modalDescription}>
                    Registreer en start je eerste dag in de app.
                  </Text>
                </View>
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.detailsTitle}>Badge Details</Text>
                {['Open de app', 'Maak een account aan', 'Gebruik de dag voor 1 dag'].map(
                  (item, i) => (
                    <View key={i} style={styles.checkItem}>
                      <FontAwesome
                        name="check"
                        size={14}
                        color="#29A86E"
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.checkText}>{item}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  content: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
  },
  progressCard: {
    height: 80,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 2,
  },
  progressSub: {
    fontSize: 14,
    color: '#515151',
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DFF5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#29A86E',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  badgeCard: {
    width: 112,
    height: 120,
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#252525',
    textAlign: 'center',
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#252525',
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252525',
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: '#515151',
  },
  detailsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    width: 354,
    alignSelf: 'center',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#252525',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkText: {
    fontSize: 14,
    color: '#515151',
  },
});
