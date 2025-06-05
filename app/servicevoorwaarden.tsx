import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ServicevoorwaardenScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Servicevoorwaarden</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.bold}>Welkom bij Breezd!</Text>
        <Text style={styles.text}>
          Deze Gebruiksvoorwaarden regelen uw toegang tot en gebruik van de Breezd-applicatie en de bijbehorende diensten, ontworpen om jongeren te helpen stoppen met vapen.
        </Text>
        <Text style={styles.text}>
          Lees deze Voorwaarden zorgvuldig door voordat u de App gebruikt. Door de App te downloaden, te installeren of op een andere manier toegang te verkrijgen tot de Diensten, stemt u in met deze Voorwaarden.
        </Text>

        <Text style={styles.bold}>1. Accountregistratie</Text>
        <Text style={styles.text}>
          1.1 Om volledig gebruik te maken van de diensten van Breezd, moet u een account aanmaken. Zorg ervoor dat de verstrekte informatie juist en actueel is.
        </Text>
        <Text style={styles.text}>
          1.2 U bent verantwoordelijk voor het handhaven van de vertrouwelijkheid van uw accountgegevens. Meld ongeautoriseerd gebruik van uw account onmiddellijk bij ons.
        </Text>

        <Text style={styles.bold}>2. Gebruiksrechten en Beperkingen</Text>
        <Text style={styles.text}>
          2.1 U krijgt een beperkte, niet-exclusieve, niet-overdraagbare licentie om de Breezd-app te gebruiken in overeenstemming met deze Voorwaarden.
        </Text>
        <Text style={styles.text}>
          2.2 U stemt ermee in de App niet te gebruiken voor illegale of ongeoorloofde doeleinden of op een manier die in strijd is met de missie van Breezd.
        </Text>

        <Text style={styles.bold}>3. Inhoud en Gebruikersgedrag</Text>
        <Text style={styles.text}>
          3.1 U bent verantwoordelijk voor de inhoud die u deelt via de App, zoals berichten of gegevens over uw voortgang.
        </Text>
        <Text style={styles.text}>
          3.2 Breezd behoudt zich het recht voor om inhoud te verwijderen die in strijd is met deze Voorwaarden of die als ongepast wordt beschouwd.
        </Text>

        <Text style={styles.bold}>4. Privacybeleid</Text>
        <Text style={styles.text}>
          4.1 Ons privacybeleid beschrijft hoe we persoonlijke gegevens verzamelen, gebruiken en beschermen. Door de App te gebruiken, stemt u in met ons privacybeleid.
        </Text>

        <Text style={styles.bold}>5. Wijzigingen in de Diensten en Voorwaarden</Text>
        <Text style={styles.text}>
          5.1 Breezd behoudt zich het recht voor om de Diensten of deze Voorwaarden op elk moment te wijzigen. We zullen redelijke inspanningen leveren om u op de hoogte te stellen van belangrijke wijzigingen.
        </Text>

        <Text style={styles.bold}>6. Beëindiging</Text>
        <Text style={styles.text}>
          6.1 U kunt uw account op elk moment beëindigen via de instellingen van de App. Breezd behoudt zich het recht voor om uw toegang tot de Diensten te beëindigen bij schending van deze Voorwaarden.
        </Text>

        <Text style={styles.bold}>7. Disclaimer van Garanties</Text>
        <Text style={styles.text}>
          7.1 De Diensten worden geleverd "zoals ze zijn" en "zoals beschikbaar", zonder enige garantie van welke aard dan ook.
        </Text>

        <Text style={styles.bold}>8. Aansprakelijkheid</Text>
        <Text style={styles.text}>
          8.1 Breezd is niet aansprakelijk voor directe, indirecte, incidentele, bijzondere of gevolgschade die voortvloeit uit het gebruik van de App.
        </Text>

        <Text style={styles.bold}>Privacybeleid</Text>
        <Text style={styles.text}>
          Lees ons Privacybeleid voor meer informatie over hoe we persoonlijke gegevens verzamelen, gebruiken en delen.
        </Text>

        <Text style={styles.text}>
          Bedankt dat je Breezd gebruikt! We zijn er om je te ondersteunen op je reis naar een vape-vrij leven.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#252525',
    marginBottom: 16,
    lineHeight: 24,
  },
});
