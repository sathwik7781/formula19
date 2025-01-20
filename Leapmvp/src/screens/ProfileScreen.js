import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundManager from '../utils/SoundManager';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [zodiacSign, setZodiacSign] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [savedFortunes, setSavedFortunes] = useState([]);

  useEffect(() => {
    loadUserPreferences();
    loadSavedFortunes();
  }, []);

  const loadUserPreferences = async () => {
    if (user) {
      const userRef = doc(db, 'userPreferences', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setZodiacSign(data.zodiacSign || '');
        setBirthYear(data.birthYear || '');
        setMusicEnabled(data.musicEnabled ?? true);
      }
    }
  };

  const loadSavedFortunes = async () => {
    if (user) {
      const fortunesRef = doc(db, 'savedFortunes', user.uid);
      const fortunesDoc = await getDoc(fortunesRef);
      
      if (fortunesDoc.exists()) {
        setSavedFortunes(fortunesDoc.data().fortunes || []);
      }
    }
  };

  const savePreferences = async () => {
    if (user) {
      await setDoc(doc(db, 'userPreferences', user.uid), {
        zodiacSign,
        birthYear,
        musicEnabled
      });
      await AsyncStorage.setItem('musicEnabled', JSON.stringify(musicEnabled));
      
      if (musicEnabled) {
        await SoundManager.playBackgroundMusic();
      } else {
        await SoundManager.pauseBackgroundMusic();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Zodiac Sign"
        value={zodiacSign}
        onChangeText={setZodiacSign}
        placeholder="Enter your zodiac sign"
      />
      <Input
        label="Birth Year"
        value={birthYear}
        onChangeText={setBirthYear}
        placeholder="Enter your birth year"
        keyboardType="number-pad"
      />
      <View style={styles.switchContainer}>
        <Text>Background Music</Text>
        <Switch
          value={musicEnabled}
          onValueChange={(value) => setMusicEnabled(value)}
        />
      </View>
      <Button
        title="Save Preferences"
        onPress={savePreferences}
        buttonStyle={styles.saveButton}
      />
      <View style={styles.fortunesContainer}>
        <Text style={styles.title}>Saved Fortunes</Text>
        {savedFortunes.map((fortune, index) => (
          <Text key={index} style={styles.fortune}>
            {fortune.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: '#D5517B',
    marginVertical: 20,
  },
  fortunesContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fortune: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default ProfileScreen; 