import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { TimerControls } from '../TimerControls';

describe('TimerControls', () => {
  const defaultProps = {
    isRunning: false,
    isFinished: false,
    onToggle: () => {},
    onReset: () => {},
    stopTimer: () => {},
    onAddTime: () => {},
    hasManuallyStopped: false,
    setHasManuallyStopped: () => {},
    id: 1
  };

  it('renders start button when not running', () => {
    renderWithProviders(<TimerControls {...defaultProps} />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('renders pause button when running', () => {
    renderWithProviders(
      <TimerControls {...defaultProps} isRunning={true} />
    );
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('renders stop button when finished', () => {
    renderWithProviders(
      <TimerControls {...defaultProps} isFinished={true} />
    );
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('calls onAddTime with correct minutes', () => {
    const onAddTime = vi.fn();
    renderWithProviders(
      <TimerControls {...defaultProps} onAddTime={onAddTime} />
    );
    
    fireEvent.click(screen.getByText('5m'));
    expect(onAddTime).toHaveBeenCalledWith(5);
  });

  it('calls onReset when restart button is clicked', () => {
    const onReset = vi.fn();
    renderWithProviders(
      <TimerControls {...defaultProps} onReset={onReset} />
    );
    
    fireEvent.click(screen.getByText('Restart'));
    expect(onReset).toHaveBeenCalled();
  });
});