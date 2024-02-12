import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import DashboardOutstandingCarbonDebit from '@/components/dashboard/DashboardOutstandingCarbonDebit';

test('should render with the debit value and difference', () => {
  const component = render(
    <DashboardOutstandingCarbonDebit
      carbonDebit={1000}
      weekDifferencePercentage={15}
    />
  );

  expect(component.queryAllByRole('heading').length).toBe(2);
  expect(component.queryAllByRole('heading')[1]).toHaveTextContent(
    '1,000common.unit.co2Kg'
  );
  const timeDifference = component.queryByText(
    /dashboard.carbonDebit.timeDifference/
  );
  expect(timeDifference).toBeInTheDocument();
  expect(component.getByText(/\+15%/)).toBeInTheDocument();
});

test('should render difference with arrow up when the difference is positive', () => {
  const component = render(
    <DashboardOutstandingCarbonDebit
      carbonDebit={1000}
      weekDifferencePercentage={15}
    />
  );

  const icon = component.container.querySelector('i');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveClass('pi-arrow-up');
});

test('should render difference with arrow down when the difference is negative', () => {
  const component = render(
    <DashboardOutstandingCarbonDebit
      carbonDebit={1000}
      weekDifferencePercentage={-15}
    />
  );

  const icon = component.container.querySelector('i');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveClass('pi-arrow-down');
});

test('should render difference with no arrow when there is no difference', () => {
  const component = render(
    <DashboardOutstandingCarbonDebit
      carbonDebit={1000}
      weekDifferencePercentage={0}
    />
  );

  const icon = component.container.querySelector('i');
  expect(icon).not.toBeInTheDocument();
});
