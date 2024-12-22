import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { Timer } from '../Timer';
import { TimerProvider } from '../../contexts/TimerContext';

vi.mock('../../utils/sound', () => ({
  TimerSound: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    volume: 50,
    isMuted: false
  }))
}));

const mockTimer = {
  id: 1,
  title: 'Test Timer',
  totalSeconds: 60,
  initialSeconds: 60,
  isRunning: false,
  isFinished: false,
  hasManuallyStopped: false,
  volume: 50,
  isMuted: false,
  sound: new (vi.fn())()
};

describe('Timer', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders timer with initial state', () => {
    renderWithProviders(<Timer timer={mockTimer} />);
    expect(screen.getByDisplayValue('Test Timer')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('updates time display when running', () => {
    const runningTimer = { ...mockTimer, isRunning: true };
    renderWithProviders(<Timer timer={runningTimer} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getAllByDisplayValue('00')).toHaveLength(2);
    expect(screen.getByDisplayValue('01')).toBeInTheDocument();
  });

  it('handles manual time input', () => {
    renderWithProviders(<Timer timer={mockTimer} />);
    expect(screen.getByLabelText('Minutes')).toHaveValue('01');
  });

  it('renders timer with correct initial props', () => {
    renderWithProviders(<Timer timer={mockTimer} />);
    expect(screen.getByDisplayValue(mockTimer.title)).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toHaveValue("01");
  });
  
  it.only('handles time change correctly', () => {
    const { rerender } = renderWithProviders(<Timer timer={mockTimer} />);
    const minutesInput = screen.getByRole('textbox', {
      name: /minutes/i
    });
    fireEvent.change(minutesInput, { target: { value: '02' } });
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, totalSeconds: 120 }} />
      </TimerProvider>
    );
    expect(minutesInput).toHaveValue('02');
  });
  
  it('toggles timer running state', () => {
    const { rerender } = renderWithProviders(<Timer timer={mockTimer} />);
    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, isRunning: true }} />
      </TimerProvider>
    );
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });
  
  it('resets timer correctly', () => {
    const runningTimer = { ...mockTimer, isRunning: true };
    const { rerender } = renderWithProviders(<Timer timer={runningTimer} />);
    const resetButton = screen.getByRole('button', { name: 'Restart' });
    fireEvent.click(resetButton);
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, isRunning: false }} />
      </TimerProvider>
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toHaveValue("01");
  });
  
  it('adds time correctly', () => {
    const { rerender } = renderWithProviders(<Timer timer={mockTimer} />);
    const addTimeButton = screen.getByRole('button', {
      name: /Add 5 min/i
    });
    fireEvent.click(addTimeButton);
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, totalSeconds: 5 * 60 }} />
      </TimerProvider>
    );
    expect(screen.getByLabelText('Minutes')).toHaveValue("05");
  });
  
  it('handles volume change correctly', () => {
    const { rerender } = renderWithProviders(<Timer timer={mockTimer} />);
    const volumeInput = screen.getByLabelText('Change volume');
    fireEvent.change(volumeInput, { target: { value: '75' } });
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, volume: 75 }} />
      </TimerProvider>
    );
    expect(volumeInput).toHaveValue('75');
  });
  
  it('toggles mute state correctly', () => {
    const { rerender } = renderWithProviders(<Timer timer={mockTimer} />);
    const muteButton = screen.getByRole('button', { name: 'Mute' });
    fireEvent.click(muteButton);
    rerender(
      <TimerProvider>
        <Timer timer={{...mockTimer, isMuted: true }} />
      </TimerProvider>
    );
    expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
  });
});

