class SpeechInteractionTTSService {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isPaused = false;
  }

  async speak(text) {
    try {
      // Stop any current playback
      this.stop();

      // Clean the text for better TTS
      const cleanedText = this.cleanText(text);
      
      // Call our API endpoint
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      // Create blob from response
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and configure audio element
      this.audio = new Audio(audioUrl);
      
      // Set up event handlers
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.isPaused = false;
      });

      this.audio.addEventListener('pause', () => {
        if (this.audio.currentTime > 0 && this.audio.currentTime < this.audio.duration) {
          this.isPaused = true;
          this.isPlaying = false;
        }
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.isPaused = false;
        URL.revokeObjectURL(audioUrl); // Clean up
      });

      this.audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        this.isPlaying = false;
        this.isPaused = false;
        URL.revokeObjectURL(audioUrl);
      });

      // Play the audio
      await this.audio.play();
      this.isPlaying = true;

    } catch (error) {
      console.error('TTS Error:', error);
      this.isPlaying = false;
      this.isPaused = false;
      throw error;
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.isPaused = false;
      setTimeout(() => {
        this.audio = null;
      }, 100);
    }
  }

  cleanText(text) {
    return text
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/$$([^$$]+)\]$$[^)]+$$/g, '$1')
      .replace(/^-\s/gm, '')
      .replace(/^\d+\.\s/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  getStatus() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      hasAudio: !!this.audio
    };
  }
}

export default new SpeechInteractionTTSService();
