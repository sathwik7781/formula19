import { analytics } from '../config/firebase';
import { logEvent } from 'firebase/analytics';

export const AnalyticsService = {
  logScreenView: (screenName) => {
    logEvent(analytics, 'screen_view', {
      screen_name: screenName,
    });
  },

  logFortuneDrawn: (fortuneType) => {
    logEvent(analytics, 'fortune_drawn', {
      fortune_type: fortuneType,
    });
  },

  logFortuneSaved: () => {
    logEvent(analytics, 'fortune_saved');
  },

  logFortuneShared: () => {
    logEvent(analytics, 'fortune_shared');
  },

  logChatbotInteraction: () => {
    logEvent(analytics, 'chatbot_interaction');
  },
}; 