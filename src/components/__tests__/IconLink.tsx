import { render } from '@testing-library/react';

import IconLink from '@/components/IconLink';
import { ModelMocks } from '@/mocks/model.mocks';

test('should render component', () => {
  const component = render(<IconLink iconData={ModelMocks.mockIcon()} />);
  expect(component.queryByRole('link')).toBeInTheDocument();
});

test('should render component with icon', () => {
  const component = render(<IconLink iconData={ModelMocks.mockIcon()} />);

  const image = component.queryByRole('img');
  expect(image).toBeInTheDocument();
  expect(image?.getAttribute('src')).toBe(ModelMocks.mockIcon().icon);
  expect(image?.getAttribute('alt')).toBe(ModelMocks.mockIcon().name);
  expect(component.queryByRole('link')?.getAttribute('href')).toBe(
    ModelMocks.mockIcon().url
  );
});
