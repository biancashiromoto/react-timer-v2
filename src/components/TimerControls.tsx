import React from 'react';
import { Play, Square, RefreshCw, Plus } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onAddTime: (minutes: number) => void;
}

export function TimerControls({ isRunning, onToggle, onReset, onAddTime }: TimerControlsProps) {
  return (
    <>
      <div className="flex justify-center gap-2 my-4">
        <button
          onClick={onToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          {isRunning ? <Square size={20} /> : <Play size={20} />}
          {isRunning ? 'Stop' : 'Start'}
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