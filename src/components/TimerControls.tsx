import { Play, Pause, Square, RefreshCw, Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface TimerControlsProps {
  isRunning: boolean;
  isFinished: boolean;
  onToggle: () => void;
  onReset: () => void;
  stopTimer: () => void;
  onAddTime: (minutes: number) => void;
  hasManuallyStopped: boolean,
  setHasManuallyStopped: Dispatch<SetStateAction<boolean>>;
}

export function TimerControls({
  isRunning,
  isFinished,
  onToggle,
  onReset,
  onAddTime,
  setHasManuallyStopped
}: TimerControlsProps) {
  let buttonIcon, buttonText;

  if (isRunning) {
    buttonIcon = <Pause size={20} />;
    buttonText = 'Pause';
  } else if (isFinished) {
    buttonIcon = <Square size={20} />;
    buttonText = 'Stop';
  } else {
    buttonIcon = <Play size={20} />; 
    buttonText = 'Start';
  }

  return (
    <>
      <div className="flex justify-center gap-2 my-4">
        <button
          onClick={() => isFinished ? setHasManuallyStopped(true) : onToggle()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          {buttonIcon}
          {buttonText}
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          Restart
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 5, 10].map((mins) => (
          <button
            key={mins}
            onClick={() => onAddTime(mins)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Plus size={16} />
            {mins}m
          </button>
        ))}
      </div>
    </>
  );
}
