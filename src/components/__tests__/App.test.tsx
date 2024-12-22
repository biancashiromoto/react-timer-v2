import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import App from '../../App';

vi.mock('../../utils/sound', () => ({
  TimerSound: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    volume: 50,
    isMuted: false
  }))
}));

describe('App', () => {
  it('renders initial timer', () => {
    renderWithProviders(<App />);
    expect(screen.getByPlaceholderText('Timer Title')).toBeInTheDocument();
  });

  it('adds new timer when clicking add button', () => {
    renderWithProviders(<App />);
    const addButton = screen.getByText('Add Timer');
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText('Timer Title')).toHaveLength(2);
  });

  it('prevents adding more than 3 timers', () => {
    renderWithProviders(<App />);
    const addButton = screen.getByText('Add Timer');
    
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(addButton).toBeDisabled();
    expect(screen.getAllByPlaceholderText('Timer Title')).toHaveLength(3);
  });

  it('deletes timer and stops sound when clicking delete button', () => {
    renderWithProviders(<App />);
    const deleteButton = screen.getByLabelText('Delete timer');
    fireEvent.click(deleteButton);
    expect(screen.getByText('No timers. Click "Add Timer" to create one.')).toBeInTheDocument();
  });
});