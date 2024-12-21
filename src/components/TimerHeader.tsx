import { Trash2 } from 'lucide-react';

interface TimerHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  onDelete: () => void;
}

export function TimerHeader({
  title,
  onTitleChange,
  onDelete,
}: TimerHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-xl font-semibold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
        placeholder="Timer Title"
      />

      <button
        aria-label="Remove"
        type="button"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        <Trash2 />
      </button>
    </div>
  );
}
