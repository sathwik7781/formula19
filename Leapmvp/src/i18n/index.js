import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const i18n = new I18n({
  en: {
    fortune: {
      daily: 'Daily Fortune',
      omikuji: 'Draw Omikuji',
      fortuneTeller: 'Fortune Teller',
      profile: 'My Profile',
      share: 'Share Fortune',
    },
    categories: {
      love: 'Love',
      career: 'Career',
      health: 'Health',
    },
    profile: {
      zodiacSign: 'Zodiac Sign',
      birthYear: 'Birth Year',
      music: 'Background Music',
      savePreferences: 'Save Preferences',
      savedFortunes: 'Saved Fortunes',
    },
  },
  ja: {
    fortune: {
      daily: '今日の運勢',
      omikuji: 'おみくじを引く',
      fortuneTeller: '占い師',
      profile: 'プロフィール',
      share: '運勢をシェア',
    },
    categories: {
      love: '恋愛運',
      career: '仕事運',
      health: '健康運',
    },
    profile: {
      zodiacSign: '星座',
      birthYear: '生年',
      music: 'BGM',
      savePreferences: '設定を保存',
      savedFortunes: '保存した運勢',
    },
  },
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n; 