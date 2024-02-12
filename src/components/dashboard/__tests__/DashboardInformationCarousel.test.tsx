import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText
} from '@testing-library/react';
import { expect, test } from 'vitest';

import DashboardInformationCarousel from '@/components/dashboard/DashboardInformationCarousel';
import { ModelMocks } from '@/mocks/model.mocks';
import { renderWithProviders } from '@/utils/test-utils';

function renderWithGlobalConfiguration() {
  return renderWithProviders(<DashboardInformationCarousel />, {
    preloadedState: {
      resources: {
        globalConfiguration: ModelMocks.mockGlobalConfiguration()
      }
    }
  });
}

test('should render component', () => {
  const component = renderWithGlobalConfiguration();
  expect(component.queryAllByRole('heading').length).toBeGreaterThan(0);
});

test('should render the internet computer SNS carousel item', async () => {
  const component = renderWithGlobalConfiguration();

  const activeCarouselItem = component.container.querySelector(
    '.p-carousel-item-active'
  ) as HTMLElement | null;
  expect(activeCarouselItem).toBeDefined();
  expect(
    getByText(activeCarouselItem!, /dashboard.informationCard.icSns/i)
  ).toBeInTheDocument();
  const whitePaperButton = getByRole(activeCarouselItem!, 'link', {
    name: /whitePaper.title/i
  }) as HTMLAnchorElement;
  expect(whitePaperButton).toBeInTheDocument();
  expect(whitePaperButton.href).toBe('http://localhost:3000/white-paper');
});

test('should render the sustainability report carousel item', async () => {
  const component = renderWithGlobalConfiguration();

  fireEvent.click(component.getByRole('button', { name: /page 2/i }));

  const activeCarouselItem = component.container.querySelector(
    '.p-carousel-item-active'
  ) as HTMLElement | null;
  expect(activeCarouselItem).toBeDefined();
  expect(
    getByText(
      activeCarouselItem!,
      /dashboard.informationCard.sustainabilityReport/i
    )
  ).toBeInTheDocument();
  const reportLink = getByRole(
    activeCarouselItem!,
    'link'
  ) as HTMLAnchorElement;
  expect(reportLink).toBeInTheDocument();
  expect(reportLink.href).toBe(
    ModelMocks.mockGlobalConfiguration().links.sustainabilityReport
  );
});

test('should render the socials carousel item', async () => {
  const component = renderWithGlobalConfiguration();

  fireEvent.click(component.getByRole('button', { name: /page 3/i }));

  const activeCarouselItem = component.container.querySelector(
    '.p-carousel-item-active'
  ) as HTMLElement | null;
  expect(activeCarouselItem).toBeDefined();
  expect(
    getByText(activeCarouselItem!, /dashboard.informationCard.joinSocials/i)
  ).toBeInTheDocument();
  const socialIcons = getAllByRole(activeCarouselItem!, 'link');
  expect(socialIcons.length).toBe(3);
  expect(socialIcons[0].getAttribute('href')).toBe(
    ModelMocks.mockGlobalConfiguration().links.twitter
  );
  expect(socialIcons[1].getAttribute('href')).toBe(
    ModelMocks.mockGlobalConfiguration().links.discord
  );
  expect(socialIcons[2].getAttribute('href')).toBe(
    ModelMocks.mockGlobalConfiguration().links.openChat
  );
});
