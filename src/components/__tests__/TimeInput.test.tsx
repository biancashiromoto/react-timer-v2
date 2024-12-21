import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { TimeInput } from '../TimeInput';

describe('TimeInput', () => {
  const defaultProps = {
    hours: 1,
    minutes: 30,
    seconds: 45,
    onChange: vi.fn(),
    disabled: false
  };

  it('renders time inputs correctly', () => {
    renderWithProviders(<TimeInput {...defaultProps} />);
    
    const hoursInput = screen.getByLabelText('Hours');
    const minutesInput = screen.getByLabelText('Minutes');
    const secondsInput = screen.getByLabelText('Seconds');

    expect(hoursInput).toHaveValue(1);
    expect(minutesInput).toHaveValue(30);
    expect(secondsInput).toHaveValue(45);
  });

  it('calls onChange with correct values when hours change', () => {
    const onChange = vi.fn();
    renderWithProviders(<TimeInput {...defaultProps} onChange={onChange} />);
    
    const hoursInput = screen.getByLabelText('Hours');
    fireEvent.change(hoursInput, { target: { value: '2' } });
    
    expect(onChange).toHaveBeenCalledWith(2, 30, 45);
  });

  it('calls onChange with correct values when minutes change', () => {
    const onChange = vi.fn();
    renderWithProviders(<TimeInput {...defaultProps} onChange={onChange} />);
    
    const minutesInput = screen.getByLabelText('Minutes');
    fireEvent.change(minutesInput, { target: { value: '45' } });
    
    expect(onChange).toHaveBeenCalledWith(1, 45, 45);
  });

  it('calls onChange with correct values when seconds change', () => {
    const onChange = vi.fn();
    renderWithProviders(<TimeInput {...defaultProps} onChange={onChange} />);
    
    const secondsInput = screen.getByLabelText('Seconds');
    fireEvent.change(secondsInput, { target: { value: '30' } });
    
    expect(onChange).toHaveBeenCalledWith(1, 30, 30);
  });

  it('clamps minutes and seconds to 59', () => {
    const onChange = vi.fn();
    renderWithProviders(<TimeInput {...defaultProps} onChange={onChange} />);
    
    const minutesInput = screen.getByLabelText('Minutes');
    fireEvent.change(minutesInput, { target: { value: '60' } });
    
    expect(onChange).toHaveBeenCalledWith(1, 59, 45);
  });

  it('handles invalid input values', () => {
    const onChange = vi.fn();
    renderWithProviders(<TimeInput {...defaultProps} onChange={onChange} />);
    
    const hoursInput = screen.getByLabelText('Hours');
    fireEvent.change(hoursInput, { target: { value: 'invalid' } });
    
    expect(onChange).toHaveBeenCalledWith(0, 30, 45);
  });

  it('disables inputs when disabled prop is true', () => {
    renderWithProviders(<TimeInput {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Hours')).toBeDisabled();
    expect(screen.getByLabelText('Minutes')).toBeDisabled();
    expect(screen.getByLabelText('Seconds')).toBeDisabled();
  });
});