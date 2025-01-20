import { Audio } from 'expo-av';

class SoundManager {
  constructor() {
    this.backgroundMusic = null;
    this.isMusicPlaying = false;
  }

  async loadBackgroundMusic() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/japanese-ambient.mp3'),
        { isLooping: true }
      );
      this.backgroundMusic = sound;
    } catch (error) {
      console.error('Error loading background music:', error);
    }
  }

  async playBackgroundMusic() {
    if (this.backgroundMusic && !this.isMusicPlaying) {
      await this.backgroundMusic.playAsync();
      this.isMusicPlaying = true;
    }
  }

  async pauseBackgroundMusic() {
    if (this.backgroundMusic && this.isMusicPlaying) {
      await this.backgroundMusic.pauseAsync();
      this.isMusicPlaying = false;
    }
  }

  async unloadBackgroundMusic() {
    if (this.backgroundMusic) {
      await this.backgroundMusic.unloadAsync();
    }
  }
}

export default new SoundManager(); 