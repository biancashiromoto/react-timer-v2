import { describe, it, expect, vi } from 'vitest';
import { timerReducer, initialState } from '../timerReducer';
import { TimerState } from '../types';

vi.mock('../../utils/sound', () => ({
  TimerSound: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    volume: 50,
    isMuted: false
  }))
}));

describe('timerReducer', () => {
  it('adds a new timer', () => {
    const newState = timerReducer(initialState, { type: 'ADD_TIMER' });
    expect(newState.timers).toHaveLength(2);
  });

  it('deletes a timer and stops its sound', () => {
    const newState = timerReducer(initialState, { type: 'DELETE_TIMER', id: 1 });
    expect(newState.timers).toHaveLength(0);
    expect(initialState.timers[0].sound.stop).toHaveBeenCalled();
  });

  it('updates timer title', () => {
    const newState = timerReducer(initialState, {
      type: 'UPDATE_TIMER_TITLE',
      id: 1,
      title: 'New Title'
    });
    expect(newState.timers[0].title).toBe('New Title');
  });

  it('handles timer completion', () => {
    const runningState: TimerState = {
      timers: [{
        ...initialState.timers[0],
        isRunning: true,
        totalSeconds: 1
      }]
    };

    const newState = timerReducer(runningState, {
      type: 'TICK_TIMER',
      id: 1
    });

    expect(newState.timers[0].totalSeconds).toBe(0);
    expect(newState.timers[0].isFinished).toBe(true);
    expect(newState.timers[0].isRunning).toBe(false);
    expect(runningState.timers[0].sound.start).toHaveBeenCalled();
  });
});