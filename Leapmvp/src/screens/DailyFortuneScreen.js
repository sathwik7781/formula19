import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { db } from '../config/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { Share } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const DailyFortuneScreen = () => {
  const [fortune, setFortune] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const { user } = useAuth();

  const fortunes = {
    love: ['運命の出会いが近づいています', '現在の関係が深まるでしょう'],
    career: ['昇進のチャンスが訪れます', '新しいスキルを習得するのに適した時期です'],
    health: ['健康運は上昇中です', '規則正しい生活を心がけましょう']
  };

  useEffect(() => {
    loadDailyFortune();
  }, []);

  const loadDailyFortune = async () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const fortuneRef = doc(db, 'userFortunes', `${user.uid}_${today}`);
      const fortuneDoc = await getDoc(fortuneRef);

      if (fortuneDoc.exists()) {
        setFortune(fortuneDoc.data());
      } else {
        generateNewFortune();
      }
    }
  };

  const generateNewFortune = async () => {
    const newFortune = {
      love: fortunes.love[Math.floor(Math.random() * fortunes.love.length)],
      career: fortunes.career[Math.floor(Math.random() * fortunes.career.length)],
      health: fortunes.health[Math.floor(Math.random() * fortunes.health.length)],
      date: new Date().toISOString()
    };

    if (user) {
      const today = new Date().toISOString().split('T')[0];
      await setDoc(doc(db, 'userFortunes', `${user.uid}_${today}`), newFortune);
    }

    setFortune(newFortune);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const shareFortune = async () => {
    try {
      await Share.share({
        message: `My fortune for today:\n\nLove: ${fortune.love}\nCareer: ${fortune.career}\nHealth: ${fortune.health}\n\nGet your fortune at Mystic Japan!`
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fortuneContainer, { opacity: fadeAnim }]}>
        {fortune && (
          <>
            <Text style={styles.category}>Love</Text>
            <Text style={styles.fortune}>{fortune.love}</Text>
            <Text style={styles.category}>Career</Text>
            <Text style={styles.fortune}>{fortune.career}</Text>
            <Text style={styles.category}>Health</Text>
            <Text style={styles.fortune}>{fortune.health}</Text>
          </>
        )}
        <Button
          title="Share Fortune"
          onPress={shareFortune}
          buttonStyle={styles.shareButton}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  fortuneContainer: {
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
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D5517B',
    marginTop: 15,
  },
  fortune: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
  shareButton: {
    backgroundColor: '#2D2D4A',
    marginTop: 20,
  },
});

export default DailyFortuneScreen; 