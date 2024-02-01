import { render, screen } from '@testing-library/react';

import App from '@/App';

test('renders app component', () => {
  render(<App />);
  const headingElements = screen.getAllByRole('heading');
  expect(headingElements.length).toBeGreaterThan(0);
});
