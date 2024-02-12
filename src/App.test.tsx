import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from '@/App';

test('renders app component', () => {
  render(<App />);
  const headingElements = screen.getAllByRole('heading');
  expect(headingElements.length).toBeGreaterThan(0);
});
