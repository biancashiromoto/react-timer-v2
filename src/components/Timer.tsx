import { useEffect } from 'react';
import { getTotalSeconds, getTimeValues } from '../utils/time';
import { TimerHeader } from './TimerHeader';
import { TimeDisplay } from './TimeDisplay';
import { TimerControls } from './TimerControls';
import { SoundControls } from './SoundControls';
import { useTimer } from '../contexts/TimerContext';
import { TimerSound } from '../utils/sound';

interface TimerProps {
  timer: {
    id: number;
    title: string;
    totalSeconds: number;
    isRunning: boolean;
    isFinished: boolean;
    hasManuallyStopped: boolean;
    volume: number;
    isMuted: boolean;
    initialSeconds: number;
    sound: TimerSound;
  };
}

export function Timer({ timer }: TimerProps) {
  const { dispatch } = useTimer();
  const { hours, minutes, seconds } = getTimeValues(timer.totalSeconds);

  useEffect(() => {
    let interval: number | undefined;

    if (timer.isRunning && timer.totalSeconds > 0) {
      interval = window.setInterval(() => {
        dispatch({ type: 'TICK_TIMER', id: timer.id });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer.isRunning, timer.totalSeconds, timer.id, dispatch]);

  const handleTimeChange = (
    field: 'hours' | 'minutes' | 'seconds',
    value: string,
  ) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    const currentValues = getTimeValues(timer.totalSeconds);
    const newValues = { ...currentValues };

    if (field === 'hours') {
      newValues.hours = numValue;
    } else {
      newValues[field] = Math.min(numValue, 59);
    }

    const newTotalSeconds = getTotalSeconds(
      newValues.hours,
      newValues.minutes,
      newValues.seconds,
    );
    
    dispatch({ type: 'SET_TIMER_SECONDS', id: timer.id, totalSeconds: newTotalSeconds });
  };


  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 mb-4 transition-all ${
        timer.isFinished ? 'animate-[pulse-blue_2s_ease-in-out_infinite]' : ''
      }`}
    >
      <TimerHeader
        title={timer.title}
        onTitleChange={(title) => 
          dispatch({ type: 'UPDATE_TIMER_TITLE', id: timer.id, title })
        }
        onDelete={() => dispatch({ type: 'DELETE_TIMER', id: timer.id })}
      />
      <TimeDisplay
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onTimeChange={handleTimeChange}
        isRunning={timer.isRunning}
      />
      <TimerControls
        isFinished={timer.isFinished}
        isRunning={timer.isRunning}
        onToggle={() => dispatch({ type: 'TOGGLE_TIMER', id: timer.id })}
        onReset={() => dispatch({ type: 'RESET_TIMER', id: timer.id })}
        onAddTime={(minutes) => dispatch({ type: 'ADD_TIME', id: timer.id, minutes })}
        hasManuallyStopped={timer.hasManuallyStopped}
        stopTimer={() => dispatch({ type: 'STOP_TIMER', id: timer.id })}
        timer={timer}
      />
      <SoundControls
        volume={timer.volume}
        isMuted={timer.isMuted}
        onVolumeChange={(volume) => 
          dispatch({ type: 'SET_VOLUME', id: timer.id, volume })
        }
        onMuteToggle={() => dispatch({ type: 'TOGGLE_MUTE', id: timer.id })}
      />
    </div>
  );
}