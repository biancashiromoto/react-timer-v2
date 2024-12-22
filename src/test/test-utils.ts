import { vi } from 'vitest';

export function createMockAudioElement() {
  return {
    currentTime: 0,
    loop: false,
    volume: 1,
    paused: true,
    play: vi.fn(),
    pause: vi.fn()
  };
}