import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { TimerHeader } from '../TimerHeader';

describe('TimerHeader', () => {
  it('renders with title', () => {
    renderWithProviders(
      <TimerHeader
        title="Test Timer"
        onTitleChange={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByDisplayValue('Test Timer')).toBeInTheDocument();
  });

  it('calls onTitleChange when title is edited', () => {
    const onTitleChange = vi.fn();
    renderWithProviders(
      <TimerHeader
        title="Test Timer"
        onTitleChange={onTitleChange}
        onDelete={() => {}}
      />
    );
    
    const titleInput = screen.getByDisplayValue('Test Timer');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(onTitleChange).toHaveBeenCalledWith('New Title');
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    renderWithProviders(
      <TimerHeader
        title="Test Timer"
        onTitleChange={() => {}}
        onDelete={onDelete}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Remove'));
    expect(onDelete).toHaveBeenCalled();
  });
});