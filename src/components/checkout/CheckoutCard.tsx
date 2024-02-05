import styled from '@emotion/styled';
import { TabView, TabPanel } from 'primereact/tabview';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import Contacts from '@/components/checkout/tabs/Contacts';
import GreenEnergy from '@/components/checkout/tabs/GreenEnergy';
import OffsetEmission from '@/components/checkout/tabs/OffsetEmission';
import PriorCommitment from '@/components/checkout/tabs/PriorCommitment';
import ThunderboltIcon from '@/theme/assets/icons/thunderbolt';
import { StyledCard } from '@/theme/styled-components';

const CheckoutCardContainer = styled(StyledCard)`
  h4 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  h5 {
    color: var(--text-color);
    font-weight: bold;
    font-size: 0.875rem;
  }

  p {
    color: var(--text-color-secondary);
    font-size: 0.75rem;
  }
`;

const CheckoutCard: FC = () => {
  const { t } = useTranslation();
  return (
    <CheckoutCardContainer>
      <TabView>
        <TabPanel
          header={t('checkout.offsetEmission.title')}
          leftIcon="pi pi-cloud-download mr-2"
        >
          <OffsetEmission />
        </TabPanel>
        <TabPanel
          header={t('checkout.greenEnergy.title')}
          leftIcon={<ThunderboltIcon width="1rem" />}
        >
          <GreenEnergy />
        </TabPanel>
        <TabPanel
          header={t('checkout.priorCommitment.title')}
          leftIcon="pi pi-eye mr-2"
        >
          <PriorCommitment />
        </TabPanel>
        <TabPanel
          header={t('checkout.contacts.title')}
          leftIcon="pi pi-phone mr-2"
        >
          <Contacts />
        </TabPanel>
      </TabView>
    </CheckoutCardContainer>
  );
};

export default CheckoutCard;
