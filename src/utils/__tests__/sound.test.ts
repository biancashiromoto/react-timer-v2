import { describe, it, expect, beforeEach } from 'vitest';
import { TimerSound } from '../sound';

describe('TimerSound', () => {
  let timerSound: TimerSound;

  beforeEach(() => {
    timerSound = new TimerSound();
  });

  it('initializes with default values', () => {
    expect(timerSound.volume).toBe(50);
    expect(timerSound.isMuted).toBe(false);
  });

  it('starts playing sound', () => {
    timerSound.start();
    expect(timerSound['audio'].play).toHaveBeenCalled();
  });

  it('stops playing sound', () => {
    timerSound.stop();
    expect(timerSound['audio'].pause).toHaveBeenCalled();
  });

  it('updates volume', () => {
    timerSound.volume = 75;
    expect(timerSound.volume).toBe(75);
    expect(timerSound['audio'].volume).toBe(0.75);
  });

  it('handles muting', () => {
    timerSound.isMuted = true;
    expect(timerSound.isMuted).toBe(true);
    expect(timerSound['audio'].volume).toBe(0);

    timerSound.isMuted = false;
    expect(timerSound.isMuted).toBe(false);
    expect(timerSound['audio'].volume).toBe(0.5);
  });
});