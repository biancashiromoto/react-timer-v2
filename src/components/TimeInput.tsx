interface TimeInputProps {
  hours: number;
  minutes: number;
  seconds: number;
  onChange: (hours: number, minutes: number, seconds: number) => void;
  disabled?: boolean;
}

export function TimeInput({
  hours,
  minutes,
  seconds,
  onChange,
  disabled,
}: TimeInputProps) {
  const handleChange = (
    field: 'hours' | 'minutes' | 'seconds',
    value: string,
  ) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    const clampedValue = field === 'hours' ? numValue : Math.min(numValue, 59);

    switch (field) {
      case 'hours':
        onChange(clampedValue, minutes, seconds);
        break;
      case 'minutes':
        onChange(hours, clampedValue, seconds);
        break;
      case 'seconds':
        onChange(hours, minutes, clampedValue);
        break;
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="flex flex-col items-center">
        <input
          aria-label="Hours"
          type="number"
          min="0"
          value={hours}
          onChange={(e) => handleChange('hours', e.target.value)}
          className="w-16 text-center p-2 border rounded-lg"
          disabled={disabled}
        />
        <label className="text-sm text-gray-600">Hours</label>
      </div>
      <span className="text-2xl">:</span>
      <div className="flex flex-col items-center">
        <input
          aria-label="Minutes"
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => handleChange('minutes', e.target.value)}
          className="w-16 text-center p-2 border rounded-lg"
          disabled={disabled}
        />
        <label className="text-sm text-gray-600">Minutes</label>
      </div>
      <span className="text-2xl">:</span>
      <div className="flex flex-col items-center">
        <input
          aria-label="Seconds"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => handleChange('seconds', e.target.value)}
          className="w-16 text-center p-2 border rounded-lg"
          disabled={disabled}
        />
        <label className="text-sm text-gray-600">Seconds</label>
      </div>
    </div>
  );
}
