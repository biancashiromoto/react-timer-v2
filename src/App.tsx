import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { Plus } from 'lucide-react';

interface TimerData {
  id: number;
  title: string;
}

export default function App() {
  const [timers, setTimers] = useState<TimerData[]>([
    { id: 1, title: '' },
  ]);

  const addTimer = () => {
    if (timers.length < 5) {
      setTimers([
        ...timers,
        { id: Date.now(), title: '' },
      ]);
    }
  };

  const updateTimerTitle = (id: number, newTitle: string) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, title: newTitle } : timer
    ));
  };

  const deleteTimer = (id: number) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={addTimer}
            disabled={timers.length >= 3}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={20} />
            Add Timer
          </button>
        </div>

        {timers.map((timer) => (
          <Timer
            key={timer.id}
            title={timer.title}
            onTitleChange={(newTitle) => updateTimerTitle(timer.id, newTitle)}
            onDelete={() => deleteTimer(timer.id)}
          />
        ))}

        {timers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No timers. Click "Add Timer" to create one.
          </div>
        )}
      </div>
    </div>
  );
}