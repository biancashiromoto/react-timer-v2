import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { TimeDisplay } from '../TimeDisplay';

describe('TimeDisplay', () => {
  const defaultProps = {
    hours: 1,
    minutes: 30,
    seconds: 45,
    onTimeChange: () => {},
    isRunning: false
  };

  it('renders time values correctly', () => {
    renderWithProviders(<TimeDisplay {...defaultProps} />);
    
    expect(screen.getByDisplayValue('01')).toBeInTheDocument(); // hours
    expect(screen.getByDisplayValue('30')).toBeInTheDocument(); // minutes
    expect(screen.getByDisplayValue('45')).toBeInTheDocument(); // seconds
  });

  it('calls onTimeChange when values are edited', () => {
    const onTimeChange = vi.fn();
    renderWithProviders(
      <TimeDisplay {...defaultProps} onTimeChange={onTimeChange} />
    );
    
    const hoursInput = screen.getByLabelText('Hours');
    fireEvent.change(hoursInput, { target: { value: '2' } });
    expect(onTimeChange).toHaveBeenCalledWith('hours', '2');
  });

  it('disables inputs when timer is running', () => {
    renderWithProviders(
      <TimeDisplay {...defaultProps} isRunning={true} />
    );
    
    expect(screen.getByLabelText('Hours')).toBeDisabled();
    expect(screen.getByLabelText('Minutes')).toBeDisabled();
    expect(screen.getByLabelText('Seconds')).toBeDisabled();
  });
});