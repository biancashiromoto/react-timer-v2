import { TimerState, TimerAction, Timer } from './types';
import { TimerSound } from '../utils/sound';

const createTimer = (id: number): Timer => ({
  id,
  title: '',
  totalSeconds: 0,
  initialSeconds: 0,
  isRunning: false,
  isFinished: false,
  hasManuallyStopped: false,
  volume: 50,
  isMuted: false,
  sound: new TimerSound()
});

export const initialState: TimerState = {
  timers: [createTimer(1)]
};

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'ADD_TIMER':
      if (state.timers.length >= 5) return state;
      return {
        ...state,
        timers: [...state.timers, createTimer(Date.now())]
      };

    case 'DELETE_TIMER': {
      const timer = state.timers.find(t => t.id === action.id);
      if (timer) {
        timer.sound.stop();
      }
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.id)
      };
    }

    case 'UPDATE_TIMER_TITLE':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.id ? { ...timer, title: action.title } : timer
        )
      };

    case 'SET_TIMER_SECONDS':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.id ? {
            ...timer,
            totalSeconds: action.totalSeconds,
            initialSeconds: action.totalSeconds,
            isFinished: false
          } : timer
        )
      };

    case 'TOGGLE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;

          if (timer.isFinished) {
            timer.sound.stop();
            return {
              ...timer,
              isFinished: false,
              totalSeconds: timer.initialSeconds,
              isRunning: true
            };
          }

          return { ...timer, isRunning: !timer.isRunning };
        })
      };

    case 'TICK_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id || !timer.isRunning) return timer;
          
          const newSeconds = timer.totalSeconds - 1;
          if (newSeconds <= 0) {
            timer.sound.start();
            return {
              ...timer,
              totalSeconds: 0,
              isRunning: false,
              isFinished: true
            };
          }
          
          return { ...timer, totalSeconds: newSeconds };
        })
      };

    default:
      return state;
  }
}