import * as Font from 'expo-font';

export const loadFonts = () => {
  return Font.loadAsync({
    'NotoSansJP-Regular': require('../../assets/fonts/NotoSansJP-Regular.otf'),
    'NotoSansJP-Bold': require('../../assets/fonts/NotoSansJP-Bold.otf'),
    'NotoSansJP-Medium': require('../../assets/fonts/NotoSansJP-Medium.otf'),
  });
}; 