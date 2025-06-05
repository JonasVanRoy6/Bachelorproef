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

export default function PrivacybeleidScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#29A86E" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacybeleid</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.bold}>Privacybeleid van Breezd</Text>
        <Text style={styles.text}>
          Bij Breezd hechten we veel waarde aan uw privacy en persoonlijke gegevens. Dit privacybeleid legt uit hoe we informatie verzamelen, gebruiken, beschermen en delen wanneer u de Breezd-applicatie en bijbehorende diensten gebruikt.
        </Text>
        <Text style={styles.text}>
          Door gebruik te maken van onze diensten, stemt u in met dit privacybeleid.
        </Text>

        <Text style={styles.bold}>1. Gegevens die we verzamelen</Text>
        <Text style={styles.text}>
          Om u optimaal te ondersteunen in uw proces, verzamelen we bepaalde gegevens:
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Accountinformatie:</Text> Naam, e-mailadres, geboortedatum en andere gegevens die u verstrekt bij het registreren.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Voortgangsgegevens:</Text> Informatie over uw gebruik, zoals uw doelen, motivatie en voortgang in het stoppen met vapen.
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>Gebruiksgegevens:</Text> Technische gegevens zoals apparaatinformatie, loggegevens en interactie binnen de app.
        </Text>

        <Text style={styles.bold}>2. Hoe we uw gegevens gebruiken</Text>
        <Text style={styles.text}>
          De verzamelde gegevens worden uitsluitend gebruikt om:
        </Text>
        <Text style={styles.text}>- Uw ervaring met de app te personaliseren.</Text>
        <Text style={styles.text}>- Uw voortgang en doelen bij te houden.</Text>
        <Text style={styles.text}>- U te voorzien van herinneringen, motivatieberichten en relevante meldingen.</Text>
        <Text style={styles.text}>- De functionaliteit en prestaties van de app te verbeteren.</Text>

        <Text style={styles.bold}>3. Hoe we uw gegevens beschermen</Text>
        <Text style={styles.text}>
          We nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies, ongeautoriseerde toegang, openbaarmaking of wijziging. Enkele van onze beveiligingsmaatregelen zijn:
        </Text>
        <Text style={styles.text}>- Versleuteling van gegevens tijdens opslag en verzending.</Text>
        <Text style={styles.text}>- Beperking van toegang tot gegevens tot geautoriseerd personeel.</Text>

        <Text style={styles.bold}>4. Delen van gegevens</Text>
        <Text style={styles.text}>
          Uw gegevens worden niet gedeeld met derden, behalve in de volgende gevallen:
        </Text>
        <Text style={styles.text}>- <Text style={{ fontWeight: 'bold' }}>Met uw toestemming:</Text> Bijvoorbeeld als u besluit uw voortgang te delen met een coach of mentor.</Text>
        <Text style={styles.text}>- <Text style={{ fontWeight: 'bold' }}>Wettelijke verplichtingen:</Text> Als we wettelijk verplicht zijn om gegevens vrij te geven.</Text>
        <Text style={styles.text}>- <Text style={{ fontWeight: 'bold' }}>Met serviceproviders:</Text> Bijvoorbeeld voor hosting en technische ondersteuning, waarbij deze partijen verplicht zijn uw gegevens te beschermen.</Text>

        <Text style={styles.bold}>5. Uw rechten</Text>
        <Text style={styles.text}>
          U heeft het recht om:
        </Text>
        <Text style={styles.text}>- Uw gegevens in te zien, te corrigeren of te verwijderen.</Text>
        <Text style={styles.text}>- Bezwaar te maken tegen het gebruik van uw gegevens.</Text>
        <Text style={styles.text}>- Uw account te beëindigen en daarmee uw gegevens te laten verwijderen.</Text>
        <Text style={styles.text}>
          Neem contact met ons op via <Text style={{ fontWeight: 'bold' }}>teambreezd@support.com</Text> om van deze rechten gebruik te maken.
        </Text>

        <Text style={styles.bold}>6. Bewaartermijn</Text>
        <Text style={styles.text}>
          Uw gegevens worden bewaard zolang u gebruikmaakt van de Breezd-app. Wanneer u uw account beëindigt, verwijderen we uw persoonlijke gegevens binnen 30 dagen, tenzij we wettelijk verplicht zijn om deze langer te bewaren.
        </Text>

        <Text style={styles.bold}>7. Cookies en vergelijkbare technologieën</Text>
        <Text style={styles.text}>
          Breezd kan cookies en vergelijkbare technologieën gebruiken om de werking van de app te verbeteren en gebruikspatronen te analyseren. U kunt cookies uitschakelen via uw apparaatinstellingen, hoewel dit de functionaliteit van de app kan beïnvloeden.
        </Text>

        <Text style={styles.bold}>8. Wijzigingen in dit beleid</Text>
        <Text style={styles.text}>
          We behouden ons het recht voor om dit privacybeleid te wijzigen. Als er belangrijke wijzigingen zijn, zullen we u hierover informeren via de app of e-mail.
        </Text>

        <Text style={styles.bold}>9. Contact</Text>
        <Text style={styles.text}>
          Voor vragen of opmerkingen over dit privacybeleid kunt u contact met ons opnemen via:
        </Text>
        <Text style={styles.text}>E-mail: teambreezd@support.com</Text>

        <Text style={styles.text}>
          Bedankt voor het vertrouwen in Breezd! Uw privacy is voor ons een prioriteit terwijl we u ondersteunen op weg naar een vape-vrij leven.
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
