import '@testing-library/jest-dom';
import { vi, beforeAll } from 'vitest';

beforeAll(() => {
  // Mock Audio API
  class AudioMock {
    currentTime: number = 0;
    loop: boolean = false;
    volume: number = 1;
    paused: boolean = true;

    play = vi.fn();
    pause = vi.fn();
  }

  global.Audio = vi.fn().mockImplementation(() => new AudioMock());

  // Mock sound file import
  vi.mock('../chill-guy.mp3', () => ({
    default: 'mocked-sound-file'
  }));
});