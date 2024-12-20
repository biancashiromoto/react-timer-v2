/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { getTotalSeconds, getTimeValues } from '../utils/time';
import { TimerHeader } from './TimerHeader';
import { TimeDisplay } from './TimeDisplay';
import { TimerControls } from './TimerControls';
import { SoundControls } from './SoundControls';
import { TimerSound } from '../utils/sound';

interface TimerProps {
  title: string;
  onTitleChange: (title: string) => void;
  onDelete: () => void;
}

export function Timer({ title, onTitleChange, onDelete }: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasManuallyStopped, setHasManuallyStopped] = useState(false);
  const timerSoundRef = useRef(new TimerSound());

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && totalSeconds > 0) {
      interval = window.setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsFinished(true);
            timerSoundRef.current.start();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    timerSoundRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    timerSoundRef.current.isMuted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (hasManuallyStopped) stopTimer();
  }, [hasManuallyStopped]);

  const { hours, minutes, seconds } = getTimeValues(totalSeconds);

  const handleTimeChange = (
    field: 'hours' | 'minutes' | 'seconds',
    value: string,
  ) => {
    if (isRunning) return;

    const numValue = Math.max(0, parseInt(value) || 0);
    const currentValues = getTimeValues(totalSeconds);
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
    setTotalSeconds(newTotalSeconds);
    setInitialSeconds(newTotalSeconds);
    setIsFinished(false);
  };

  const addTime = (additionalMinutes: number) => {
    const newTotalSeconds = totalSeconds + additionalMinutes * 60;
    setTotalSeconds(newTotalSeconds);
    if (!isRunning) {
      setInitialSeconds(newTotalSeconds);
    }
    setIsFinished(false);
  };

  const toggleTimer = () => {
    if (isFinished) {
      timerSoundRef.current.stop();
      setIsFinished(false);
      setTotalSeconds(initialSeconds);
      setIsRunning(true);
    } else if (isRunning) {
      setIsRunning(false);
    } else if (totalSeconds > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTotalSeconds(initialSeconds);
    timerSoundRef.current.stop();
    setIsFinished(true);
    setHasManuallyStopped(false);
    setIsFinished(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(initialSeconds);
    timerSoundRef.current.stop();
    setIsFinished(false);
    setIsRunning(true);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 mb-4 transition-all ${
        isFinished ? 'animate-[pulse-blue_2s_ease-in-out_infinite]' : ''
      }`}
    >
      <TimerHeader
        title={title}
        onTitleChange={onTitleChange}
        onDelete={onDelete}
      />
      <TimeDisplay
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onTimeChange={handleTimeChange}
        isRunning={isRunning}
      />
      <TimerControls
        stopTimer={stopTimer}
        isFinished={isFinished}
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
        onAddTime={addTime}
        hasManuallyStopped={hasManuallyStopped}
        setHasManuallyStopped={setHasManuallyStopped}
      />
      <SoundControls
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onMuteToggle={() => setIsMuted(!isMuted)}
      />
    </div>
  );
}
