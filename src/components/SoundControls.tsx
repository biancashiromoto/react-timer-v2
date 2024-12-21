import { Volume2, VolumeX } from 'lucide-react';

interface SoundControlsProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

export function SoundControls({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: SoundControlsProps) {
  return (
    <div className="flex items-center gap-2 mt-4 justify-center">
      <button
        type="button"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        onClick={onMuteToggle}
        className={`p-2 rounded-lg ${
          isMuted ? 'bg-gray-200' : 'bg-blue-100'
        } hover:opacity-80`}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        aria-label="Change volume"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm text-gray-600 w-8">{volume}%</span>
    </div>
  );
}
