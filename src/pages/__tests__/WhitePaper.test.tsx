import { render } from '@testing-library/react';

import WhitePaper from '@/pages/WhitePaper';

test('should render component', () => {
  const component = render(<WhitePaper />);
  expect(component.queryByRole('heading')).toBeInTheDocument();
});
