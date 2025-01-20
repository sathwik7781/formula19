import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { Shake } from 'expo-shake';

const OmikujiScreen = () => {
  const [fortune, setFortune] = useState(null);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const fortunes = [
    '大吉 (Dai-kichi) - Excellent Luck',
    '中吉 (Chū-kichi) - Good Luck',
    '小吉 (Shō-kichi) - Small Luck',
    '末吉 (Sue-kichi) - Future Luck',
    '凶 (Kyō) - Bad Luck',
  ];

  useEffect(() => {
    Shake.addListener(() => {
      animateShake();
      drawFortune();
    });

    return () => {
      Shake.removeSubscription();
    };
  }, []);

  const animateShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const drawFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.omikujiBox,
          {
            transform: [{ translateX: shakeAnimation }],
          },
        ]}
      >
        <Text style={styles.instructions}>
          Shake your phone to draw an omikuji!
        </Text>
        {fortune && <Text style={styles.fortune}>{fortune}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  omikujiBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  fortune: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D5517B',
  },
});

export default OmikujiScreen; 