export function getTotalSeconds(hours: number, minutes: number, seconds: number): number {
  return hours * 3600 + minutes * 60 + seconds;
}

export function getTimeValues(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export function formatTimeValue(value: number): string {
  return value.toString().padStart(2, '0');
}