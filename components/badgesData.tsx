export type Badge = {
  name: string;
  icon: string;
  achieved: boolean;
  color?: string;
  description?: string;
  criteria?: string[];
};

const initialBadges: Badge[] = [
  {
    name: 'First Step Hero',
    icon: 'rocket',
    achieved: false,
    description: 'Je bent gestart met je rookvrije reis. Goed begin!',
    criteria: ['App geopend', 'Account aangemaakt', 'Eerste dag onder vape-doel gebleven'],
  },
  {
    name: 'Groene Dag',
    icon: 'leaf',
    achieved: false,
    description: 'Een dag volledig onder je vape-doel gebleven.',
    criteria: ['24 uur onder je vape-doel gebleven'],
  },
  {
    name: 'Perfecte Week',
    icon: 'calendar',
    achieved: false,
    description: 'Zeven dagen achter elkaar onder je vape-doel gebleven.',
    criteria: ['7 opeenvolgende dagen onder vape-doel'],
  },
  {
    name: 'Maand Meester',
    icon: 'trophy',
    achieved: false,
    description: '30 dagen volgehouden zonder je vape-doel te overschrijden.',
    criteria: ['30 dagen onder vape-doel', 'Geen enkele dag overschreden'],
  },
  {
    name: 'Doel Beuker',
    icon: 'bullseye',
    achieved: false,
    description: 'Doelen behaald in meerdere levensdomeinen.',
    criteria: ['3 duurzame doelen', '3 gezondheidsdoelen', '3 mentale doelen'],
  },
  {
    name: 'Mentale Meester',
    icon: 'hand-rock-o',
    achieved: false,
    description: 'Je hebt mentale focus en doorzettingsvermogen getoond.',
    criteria: ['6 mentale doelen behaald', 'Minstens 10 dagen actief'],
  },
  {
    name: 'Uitdaging Behaald',
    icon: 'flag-checkered',
    achieved: false,
    description: 'Je hebt succesvol een challenge voltooid en geld uitgespaard.',
    criteria: ['Challenge gestart', 'Doelbedrag behaald'],
  },
  {
    name: 'Dagen Gewonnen',
    icon: 'clock-o',
    achieved: false,
    description: '5 dagen op rij onder je vape-doel gebleven.',
    criteria: ['5 opeenvolgende dagen onder vape-doel'],
  },
  {
    name: 'Gezonde Gewoonten',
    icon: 'heart',
    achieved: false,
    description: 'Je werkt actief aan je fysieke gezondheid.',
    criteria: ['6 gezondheidsdoelen voltooid', '10 dagen onder vape-doel'],
  },
  {
    name: 'Financiële Focus',
    icon: 'money',
    achieved: false,
    description: 'Je hebt geld bespaard met je rookvrije voortgang.',
    criteria: ['6 geld-doelen voltooid', 'Minstens €25 uitgespaard via challenges'],
  },
  {
    name: 'Leaderboard Legend',
    icon: 'star',
    achieved: false,
    description: 'Je stond bovenaan in de leaderboard. Kampioen!',
    criteria: ['1e plaats behaald', 'Minstens 5 dagen op leaderboard actief'],
  },
  {
    name: 'Vrienden Strijder',
    icon: 'user-plus',
    achieved: false,
    description: 'Je hebt vrienden uitgenodigd en samen gestreden op het leaderboard.',
    criteria: ['Minstens 2 vrienden uitgenodigd'],
  },
];

export default initialBadges;
