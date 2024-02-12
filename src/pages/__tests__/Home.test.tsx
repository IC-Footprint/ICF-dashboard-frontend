import { expect, test } from 'vitest';

import Home from '@/pages/Home';
import { renderWithProviders } from '@/utils/test-utils';

test('should render component', () => {
  const component = renderWithProviders(<Home />);
  expect(component.queryAllByRole('heading').length).toBeGreaterThan(0);
});
