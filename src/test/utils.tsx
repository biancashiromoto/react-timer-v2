import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { TimerProvider } from '../contexts/TimerContext';

export function renderWithProviders(ui: ReactElement) {
  const { rerender } = render(
    <TimerProvider>
      {ui}
    </TimerProvider>
  );

  return { rerender }
}