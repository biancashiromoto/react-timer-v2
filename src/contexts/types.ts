import { TimerSound } from '../utils/sound';

export interface Timer {
  id: number;
  title: string;
  totalSeconds: number;
  initialSeconds: number;
  isRunning: boolean;
  isFinished: boolean;
  hasManuallyStopped: boolean;
  volume: number;
  isMuted: boolean;
  sound: TimerSound;
}

export interface TimerState {
  timers: Timer[];
}

export type TimerAction =
  | { type: 'ADD_TIMER' }
  | { type: 'DELETE_TIMER'; id: number }
  | { type: 'UPDATE_TIMER_TITLE'; id: number; title: string }
  | { type: 'SET_TIMER_SECONDS'; id: number; totalSeconds: number }
  | { type: 'TOGGLE_TIMER'; id: number }
  | { type: 'RESET_TIMER'; id: number }
  | { type: 'ADD_TIME'; id: number; minutes: number }
  | { type: 'SET_VOLUME'; id: number; volume: number }
  | { type: 'TOGGLE_MUTE'; id: number }
  | { type: 'STOP_TIMER'; id: number }
  | { type: 'SET_FINISHED'; id: number; isFinished: boolean }
  | { type: 'SET_MANUALLY_STOPPED'; id: number; stopped: boolean }
  | { type: 'TICK_TIMER'; id: number };