import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/images/japanese-background.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Daily Fortune"
            onPress={() => navigation.navigate('DailyFortune')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Button
            title="Draw Omikuji"
            onPress={() => navigation.navigate('Omikuji')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Button
            title="Fortune Teller"
            onPress={() => navigation.navigate('FortuneTeller')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Button
            title="My Profile"
            onPress={() => navigation.navigate('Profile')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#D5517B',
    marginVertical: 10,
    borderRadius: 25,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 