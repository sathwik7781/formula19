import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/loadFonts';

const AppLoading = ({ onFinish }) => {
  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Minimum display time
        await SplashScreen.hideAsync();
        onFinish();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.splash}
      />
      <Text style={styles.loadingText}>運命の扉が開かれます...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5517B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 20,
    color: 'white',
    fontSize: 18,
    fontFamily: 'NotoSansJP-Medium',
  },
});

export default AppLoading; 