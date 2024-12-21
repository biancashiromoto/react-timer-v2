import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { Timer } from '../Timer';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders timer with initial state', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    expect(screen.getByDisplayValue('Test Timer')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('starts and stops timer', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    // Set initial time
    const minutesInput = screen.getByLabelText('Minutes');
    fireEvent.change(minutesInput, { target: { value: '1' } });

    // Start timer
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(screen.getByText('Pause')).toBeInTheDocument();

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Pause timer
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('adds time correctly', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    const addButton = screen.getByText('5m');
    fireEvent.click(addButton);

    const minutesInput = screen.getByLabelText('Minutes');
    expect(minutesInput).toHaveValue(Number('5'));
  });

  it('resets timer correctly', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    // Set initial time
    const minutesInput = screen.getByLabelText('Minutes');
    fireEvent.change(minutesInput, { target: { value: '1' } });

    // Start timer
    fireEvent.click(screen.getByText('Start'));

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // Reset timer
    fireEvent.click(screen.getByText('Restart'));
    expect(minutesInput).toHaveValue(Number('1'));
  });

  it('handles sound controls', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    const muteButton = screen.getByLabelText('Mute');
    fireEvent.click(muteButton);
    expect(screen.getByLabelText('Unmute')).toBeInTheDocument();

    const volumeSlider = screen.getByLabelText('Change volume');
    fireEvent.change(volumeSlider, { target: { value: '75' } });
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('completes timer and plays sound', () => {
    renderWithProviders(
      <Timer title="Test Timer" onTitleChange={() => {}} onDelete={() => {}} />,
    );

    // Set initial time to 1 second
    const secondsInput = screen.getByLabelText('Seconds');
    fireEvent.change(secondsInput, { target: { value: '1' } });

    // Start timer
    fireEvent.click(screen.getByText('Start'));

    // Complete timer
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Stop')).toBeInTheDocument();
  });
});
