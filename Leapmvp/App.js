import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'react-native-elements';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/contexts/AuthContext';
import { theme } from './src/theme';
import i18n from './src/i18n';
import SoundManager from './src/utils/SoundManager';
import ErrorBoundary from './src/components/ErrorBoundary';
import { linking } from './src/navigation/linking';
import AppLoading from './src/screens/AppLoading';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import DailyFortuneScreen from './src/screens/DailyFortuneScreen';
import OmikujiScreen from './src/screens/OmikujiScreen';
import FortuneTellerScreen from './src/screens/FortuneTellerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setupApp() {
      await SoundManager.loadBackgroundMusic();
      const musicEnabled = await AsyncStorage.getItem('musicEnabled');
      if (musicEnabled !== 'false') {
        await SoundManager.playBackgroundMusic();
      }
    }
    setupApp();
    return () => {
      SoundManager.unloadBackgroundMusic();
    };
  }, []);

  if (!isReady) {
    return <AppLoading onFinish={() => setIsReady(true)} />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: i18n.t('fortune.daily') }} 
              />
              <Stack.Screen 
                name="DailyFortune" 
                component={DailyFortuneScreen}
                options={{ title: i18n.t('fortune.daily') }} 
              />
              <Stack.Screen 
                name="Omikuji" 
                component={OmikujiScreen}
                options={{ title: i18n.t('fortune.omikuji') }} 
              />
              <Stack.Screen 
                name="FortuneTeller" 
                component={FortuneTellerScreen}
                options={{ title: i18n.t('fortune.fortuneTeller') }} 
              />
              <Stack.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{ title: i18n.t('fortune.profile') }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
} 