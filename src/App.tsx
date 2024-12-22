import { Plus } from 'lucide-react';
import { Timer } from './components/Timer';
import { useTimer } from './contexts/TimerContext';

export default function App() {
  const { state, dispatch } = useTimer();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => dispatch({ type: 'ADD_TIMER' })}
            disabled={state.timers.length >= 3}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus size={20} />
            Add Timer
          </button>
        </div>

        {state.timers.map((timer) => (
          <Timer
            key={timer.id}
            timer={timer}
          />
        ))}

        {state.timers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No timers. Click "Add Timer" to create one.
          </div>
        )}
      </div>
    </div>
  );
}