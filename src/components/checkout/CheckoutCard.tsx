import { TabView, TabPanel } from 'primereact/tabview';

import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import OffsetEmission from '@/components/checkout/OffsetEmission';
import ThunderboltIcon from '@/theme/assets/icons/thunderbolt';
import { StyledCard } from '@/theme/styled-components';

const CheckoutCard: FC = () => {
  const { t } = useTranslation();
  return (
    <StyledCard>
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
          Green Energy
        </TabPanel>
        <TabPanel
          header={t('checkout.priorCommitment.title')}
          leftIcon="pi pi-eye mr-2"
        >
          Prove prior commitment
        </TabPanel>
        <TabPanel
          header={t('checkout.contacts.title')}
          leftIcon="pi pi-phone mr-2"
        >
          Speak to Us
        </TabPanel>
      </TabView>
    </StyledCard>
  );
};

export default CheckoutCard;
