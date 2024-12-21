import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { SoundControls } from '../SoundControls';

describe('SoundControls', () => {
  const defaultProps = {
    volume: 50,
    isMuted: false,
    onVolumeChange: () => {},
    onMuteToggle: () => {}
  };

  it('renders volume controls', () => {
    renderWithProviders(<SoundControls {...defaultProps} />);
    expect(screen.getByLabelText('Change volume')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('calls onVolumeChange when volume is adjusted', () => {
    const onVolumeChange = vi.fn();
    renderWithProviders(
      <SoundControls {...defaultProps} onVolumeChange={onVolumeChange} />
    );
    
    const volumeSlider = screen.getByLabelText('Change volume');
    fireEvent.change(volumeSlider, { target: { value: '75' } });
    expect(onVolumeChange).toHaveBeenCalledWith(75);
  });

  it('toggles mute button state', () => {
    const onMuteToggle = vi.fn();
    renderWithProviders(
      <SoundControls {...defaultProps} onMuteToggle={onMuteToggle} />
    );
    
    fireEvent.click(screen.getByLabelText('Mute'));
    expect(onMuteToggle).toHaveBeenCalled();
  });

  it('shows correct mute button state', () => {
    renderWithProviders(
      <SoundControls {...defaultProps} isMuted={true} />
    );
    expect(screen.getByLabelText('Unmute')).toBeInTheDocument();
  });
});