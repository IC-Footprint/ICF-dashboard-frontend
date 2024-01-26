import { render, screen } from '@testing-library/react';

import App from '@/App';

test('renders app component', () => {
  render(<App />);
  const headingElement = screen.getByRole('button');
  expect(headingElement).toBeInTheDocument();
});
