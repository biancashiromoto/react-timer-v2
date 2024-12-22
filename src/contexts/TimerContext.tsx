import { createContext, useContext, useReducer, ReactNode } from 'react';
import { TimerSound } from '../utils/sound';

interface Timer {
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

interface TimerState {
  timers: Timer[];
}

type TimerAction =
  | { type: 'ADD_TIMER' }
  | { type: 'DELETE_TIMER'; id: number }
  | { type: 'UPDATE_TIMER_TITLE'; id: number; title: string }
  | { type: 'SET_TIMER_SECONDS'; id: number; totalSeconds: number }
  | { type: 'TOGGLE_TIMER'; id: number }
  | { type: 'RESET_TIMER'; id: number }
  | { type: 'ADD_TIME'; id: number; minutes: number }
  | { type: 'SET_VOLUME'; id: number; volume: number }
  | { type: 'TOGGLE_MUTE'; id: number }
  | { type: 'SET_FINISHED'; id: number; isFinished: boolean }
  | { type: 'SET_MANUALLY_STOPPED'; id: number; stopped: boolean }
  | { type: 'TICK_TIMER'; id: number };

const initialState: TimerState = {
  timers: [{ 
    id: 1,
    title: '',
    totalSeconds: 0,
    initialSeconds: 0,
    isRunning: false,
    isFinished: false,
    hasManuallyStopped: false,
    volume: 50,
    isMuted: false,
    sound: new TimerSound()
  }],
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'ADD_TIMER':
      if (state.timers.length >= 5) return state;
      return {
        ...state,
        timers: [...state.timers, {
          id: Date.now(),
          title: '',
          totalSeconds: 0,
          initialSeconds: 0,
          isRunning: false,
          isFinished: false,
          hasManuallyStopped: false,
          volume: 50,
          isMuted: false,
          sound: new TimerSound()
        }],
      };

    case 'DELETE_TIMER': {
      const timer = state.timers.find(t => t.id === action.id);
      if (timer) {
        timer.sound.stop();
      }
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.id),
      };
    }

    case 'UPDATE_TIMER_TITLE':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.id ? { ...timer, title: action.title } : timer
        ),
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
        ),
      };

    case 'TOGGLE_TIMER': {
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
        }),
      };
    }

    case 'RESET_TIMER': {
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;
          timer.sound.stop();
          return {
            ...timer,
            isRunning: true,
            totalSeconds: timer.initialSeconds,
            isFinished: false
          };
        }),
      };
    }

    case 'ADD_TIME':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;
          const newTotalSeconds = timer.totalSeconds + action.minutes * 60;
          return {
            ...timer,
            totalSeconds: newTotalSeconds,
            initialSeconds: timer.isRunning ? timer.initialSeconds : newTotalSeconds,
            isFinished: false
          };
        }),
      };

    case 'SET_VOLUME':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;
          timer.sound.volume = action.volume;
          return { ...timer, volume: action.volume };
        }),
      };

    case 'TOGGLE_MUTE':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;
          const newMuted = !timer.isMuted;
          timer.sound.isMuted = newMuted;
          return { ...timer, isMuted: newMuted };
        }),
      };

    case 'SET_FINISHED':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.id !== action.id) return timer;
          if (action.isFinished) {
            timer.sound.start();
          }
          return { ...timer, isFinished: action.isFinished, isRunning: false };
        }),
      };

    case 'SET_MANUALLY_STOPPED': {
      const timer = state.timers.find(t => t.id === action.id);
      if (timer) {
        timer.sound.stop();
      }
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.id ? {
            ...timer,
            hasManuallyStopped: action.stopped,
            isFinished: false,
            totalSeconds: timer.initialSeconds
          } : timer
        ),
      };
    }

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
        }),
      };

    default:
      return state;
  }
}

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
} | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}