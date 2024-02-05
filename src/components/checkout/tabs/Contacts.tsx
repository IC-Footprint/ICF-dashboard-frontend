import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { FC } from 'react';

import IconLink from '@/components/IconLink';
import LinkButton from '@/components/LinkButton';
import useResources from '@/helpers/state/useResources';
import { ResourcesMappers } from '@/state/resources/resources-mappers';
import icFootprintLogo from '@/theme/assets/ic-footprint-logo.svg';
import {
  FlexRowContainer,
  FlexColumnContainer
} from '@/theme/styled-components';

const Contacts: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { loadGlobalConfiguration },
    globalConfiguration
  } = useResources();

  useEffect(() => {
    if (!globalConfiguration) {
      loadGlobalConfiguration();
    }
  }, [globalConfiguration, loadGlobalConfiguration]);

  const socialIcons = useMemo(() => {
    return [
      ResourcesMappers.mapSocialIconLink(globalConfiguration, 'twitter'),
      ResourcesMappers.mapSocialIconLink(globalConfiguration, 'discord'),
      ResourcesMappers.mapSocialIconLink(globalConfiguration, 'openChat')
    ];
  }, [globalConfiguration]);

  return (
    <FlexColumnContainer className="align-items-center">
      <img
        src={icFootprintLogo}
        alt="IC Footprint Logo"
        className="max-w-6rem"
      />
      <div className="text-center mb-5">
        <h4>{t('checkout.contacts.joinOurSocials')}</h4>
        <FlexRowContainer className="justify-content-center">
          {socialIcons.map((icon: IconModel) => (
            <IconLink key={icon.name} iconData={icon} />
          ))}
        </FlexRowContainer>
      </div>
      <LinkButton
        url={globalConfiguration?.links.scheduleCall}
        label={t('checkout.contacts.scheduleCall')}
      />
    </FlexColumnContainer>
  );
};

export default Contacts;
