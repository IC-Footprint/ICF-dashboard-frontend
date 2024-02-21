import { expect, test } from 'vitest';

import Dashboard from '@/pages/Dashboard';
import { renderWithProviders } from '@/utils/test-utils';

test('should render component', () => {
  const component = renderWithProviders(<Dashboard />);
  expect(component.queryAllByRole('heading').length).toBeGreaterThan(0);
});
