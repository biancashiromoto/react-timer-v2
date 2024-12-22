import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement) {
  return render(ui);
}