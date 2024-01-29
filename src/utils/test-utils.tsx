import { render } from '@testing-library/react';

import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';
import type { RootState } from '@/state/build-store';

import { createStore } from '@/state/build-store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = createStore(preloadedState);
  return render(
    <StoreProvider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </StoreProvider>,
    renderOptions
  );
}
