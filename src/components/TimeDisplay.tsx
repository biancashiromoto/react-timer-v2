import { formatTimeValue } from '../utils/time';

interface TimeDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  onTimeChange: (field: 'hours' | 'minutes' | 'seconds', value: string) => void;
  isRunning: boolean;
}

export function TimeDisplay({
  hours,
  minutes,
  seconds,
  onTimeChange,
  isRunning,
}: TimeDisplayProps) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 flex-col">
          <input
            aria-label="Hours"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formatTimeValue(hours)}
            onChange={(e) => onTimeChange('hours', e.target.value)}
            className="w-16 text-center p-2 border rounded-lg text-2xl font-bold"
            disabled={isRunning}
            min="0"
            max="59"
          />
          Hours
        </label>
      </div>
      <span className="text-2xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 flex-col">
          <input
            aria-label="Minutes"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formatTimeValue(minutes)}
            onChange={(e) => onTimeChange('minutes', e.target.value)}
            className="w-16 text-center p-2 border rounded-lg text-2xl font-bold"
            disabled={isRunning}
            min="0"
            max="59"
          />
          Minutes
        </label>
      </div>
      <span className="text-2xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 flex-col">
           <input
            type="number"
            min="0"
            max="59"
            value={formatTimeValue(seconds)}
            onChange={(e) => onTimeChange('seconds', e.target.value)}
            className="w-16 text-center p-2 border rounded-lg text-2xl font-bold"
            disabled={isRunning}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          Seconds
        </label>
      </div>
    </div>
  );
}