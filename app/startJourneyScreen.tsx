import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Slide1 from '../components/slides/slide1';
import Slide2 from '../components/slides/slide2';
import Slide3 from '../components/slides/slide3';

const { width } = Dimensions.get('window');

const slides = [<Slide1 />, <Slide2 />, <Slide3 />];

export default function StartJourneyScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/home'); // Pas dit aan als je naar een ander scherm wil
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Indicator + Button */}
      <View style={styles.bottomRow}>
        <View style={styles.indicators}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            currentIndex === slides.length - 1 && styles.blackButton,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Starten' : 'Volgende'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 60,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(81, 81, 81, 0.45)',
    marginRight: 8,
  },
  activeDot: {
    width: 30,
    height: 8,
    borderRadius: 50,
    backgroundColor: '#252525',
  },
  button: {
    width: 148,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#29A86E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButton: {
    backgroundColor: '#252525',
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '400',
  },
});
