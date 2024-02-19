import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import { InformationItemContainer } from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useResources from '@/helpers/state/useResources';
import icFootprintLogo from '@/theme/assets/ic-footprint-logo.svg';
import { FlexColumnContainer, StyledCard } from '@/theme/styled-components';

interface CheckoutSuccessProps {
  carbonDebit: number;
  nodeId: string;
}

const FlexCenteredColumnContainer = styled(FlexColumnContainer)`
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const CheckoutSuccess: FC<CheckoutSuccessProps> = ({ carbonDebit, nodeId }) => {
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

  return (
    <FlexCenteredColumnContainer>
      <img src={icFootprintLogo} alt="IC Footprint Logo" className="h-6rem" />
      <InformationItemContainer>
        <h4>{t('checkout.offsetEmission.success.compensationTitle')}</h4>
        <h2>
          {t('common.unit.co2Kg', {
            value: carbonDebit
          })}
        </h2>
      </InformationItemContainer>
      <StyledCard className="my-4 mx-7">
        <FlexCenteredColumnContainer>
          <InformationItemContainer>
            <h4>{t('checkout.offsetEmission.success.for')}</h4>
            <h2>{t('checkout.offsetEmission.success.nodeMachine')}</h2>
          </InformationItemContainer>
          <a
            href={`${globalConfiguration?.links.internetComputerDashboard}/node/${nodeId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nodeId}
          </a>
        </FlexCenteredColumnContainer>
      </StyledCard>
      <InformationItemContainer>
        <h5>{t('checkout.offsetEmission.success.with')}</h5>
        <h2 className="text-primary font-light">{t('common.icFootprint')}</h2>
      </InformationItemContainer>
    </FlexCenteredColumnContainer>
  );
};

export default CheckoutSuccess;
