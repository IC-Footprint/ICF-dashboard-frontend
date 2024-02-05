import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type {
  DashboardCarouselItemModel,
  IconModel
} from '@/models/dashboard/dashboard-carousel-item-model';
import type { FC } from 'react';

import { ResourcesMappers } from '@/state/resources/resources-mappers';
import IconLink from '@/components/IconLink';
import useResources from '@/helpers/state/useResources';
import { appRoutes } from '@/router/app-routes';
import carouselBackground from '@/theme/assets/carousel-background.png';
import {
  FlexColumnContainer,
  FlexRowContainer,
  StyledCard
} from '@/theme/styled-components';

const CarouselCard = styled(StyledCard)`
  background-image: url(${carouselBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 0;

  .p-card-content {
    padding: 0;
  }

  .p-card-body {
    padding-bottom: 0;
  }
`;

const CarouselItemContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DashboardInformationCarousel: FC = () => {
  const { t } = useTranslation();

  const {
    actions: { loadGlobalConfiguration },
    globalConfiguration
  } = useResources();

  useEffect(() => {
    if (!globalConfiguration) {
      loadGlobalConfiguration();
    }
  });

  const items: DashboardCarouselItemModel[] = useMemo<
    DashboardCarouselItemModel[]
  >((): DashboardCarouselItemModel[] => {
    return [
      {
        title: t('dashboard.informationCard.icSns'),
        buttonLabel: t('whitePaper.title') ?? '',
        redirectRoute: appRoutes.whitePaper.root
      },
      {
        title: t('dashboard.informationCard.sustainabilityReport', {
          year: process.env.REACT_APP_SUSTAINABILITY_REPORT_YEAR
        }),
        buttonLabel: t('common.report') ?? '',
        href: globalConfiguration?.links.sustainabilityReport ?? ''
      },
      {
        title: t('dashboard.informationCard.joinSocials'),
        socialIcons: [
          ResourcesMappers.mapSocialIconLink(globalConfiguration, 'twitter'),
          ResourcesMappers.mapSocialIconLink(globalConfiguration, 'discord'),
          ResourcesMappers.mapSocialIconLink(globalConfiguration, 'openChat')
        ]
      }
    ];
  }, [t, globalConfiguration]);

  const itemTemplate = (item: DashboardCarouselItemModel) => {
    let itemActions = null;
    if (item.redirectRoute) {
      itemActions = (
        <Link to={item.redirectRoute}>
          <Button
            label={item.buttonLabel}
            outlined
            severity="secondary"
            size="small"
          />
        </Link>
      );
    } else if (item.href) {
      itemActions = (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-button p-button-outlined p-button-sm p-button-secondary no-underline font-bold"
        >
          {item.buttonLabel}
        </a>
      );
    } else if (item.socialIcons) {
      itemActions = (
        <FlexRowContainer>
          {item.socialIcons.map((icon: IconModel) => (
            <IconLink key={icon.name} iconData={icon} />
          ))}
        </FlexRowContainer>
      );
    }

    return (
      <CarouselItemContainer key={item.title}>
        <h2 className="text-center font-bold white-space-pre-line">
          {item.title}
        </h2>
        {itemActions}
      </CarouselItemContainer>
    );
  };

  return (
    <CarouselCard>
      <Carousel
        value={items}
        circular
        autoplayInterval={3000}
        itemTemplate={itemTemplate}
        showNavigators={false}
      />
    </CarouselCard>
  );
};

export default DashboardInformationCarousel;
