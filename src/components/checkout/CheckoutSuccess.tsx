import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { FC } from 'react';

import { InformationItemContainer } from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useResources from '@/helpers/state/useResources';
import icFootprintLogo from '@/theme/assets/ic-footprint-logo.svg';
import icLogo from '@/theme/assets/ic-logo.png';
import { socialLogos } from '@/theme/assets/social-logos';

import { cardBackgroundColor } from '@/theme/colors';
import {
  FlexColumnContainer,
  StyledCard,
  ShareButton,
  FlexRowContainer
} from '@/theme/styled-components';

interface CheckoutSuccessProps {
  carbonDebit: number;
  nodeId: string;
  account?: CarbonAccountModel;
}

const FlexCenteredColumnContainer = styled(FlexColumnContainer)`
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const EntityCard = styled(StyledCard)`
  & {
    background: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.28),
      rgba(255, 255, 255, 0.02)
    );
    padding: 0.125rem;
  }

  .p-card-body {
    backdrop-filter: blur(1px);
    background: linear-gradient(
      45deg,
      ${cardBackgroundColor}00,
      ${cardBackgroundColor}ff
    );
    border-radius: 0.875rem;
  }
`;

const CheckoutSuccess: FC<CheckoutSuccessProps> = ({
  carbonDebit,
  nodeId,
  account
}) => {
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

  const targetNodeTemplate = () => {
    if (account?.type !== 'nodes' && account?.operator) {
      return (
        <FlexRowContainer>
          <img src={account.operator?.icon ?? icLogo} alt="Logo" width={30} />
          <h2>{account.operator.name}</h2>
        </FlexRowContainer>
      );
    }
    return (
      <h2>
        {t(`checkout.offsetEmission.success.type.${account?.type ?? 'nodes'}`)}
      </h2>
    );
  };

  const getIcpDetailsPath = () => {
    const path = 'node';
    if (account?.type === 'projects') {
      return 'subnet';
    }
    if (account?.type === 'nodeProviders') {
      return 'provider';
    }
    return path;
  };

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
      <EntityCard className="my-4 mx-7">
        <FlexCenteredColumnContainer>
          <InformationItemContainer>
            <h4>{t('checkout.offsetEmission.success.for')}</h4>
            {targetNodeTemplate()}
          </InformationItemContainer>
          <a
            href={`${
              globalConfiguration?.links.internetComputerDashboard
            }/${getIcpDetailsPath()}/${nodeId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nodeId}
          </a>
        </FlexCenteredColumnContainer>
      </EntityCard>
      <ShareButton
        onClick={() => {
          const tweetText = `I successfully compensated ${carbonDebit} KgCO2e of on-chain emissions using @icfootprint. #CleanCrypto #ICP #carboncrowd\n\n${window.location.href}`;
          const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetText
          )}`;
          window.open(tweetUrl, '_blank');
        }}
        label="SHARE"
        icon={<img src={socialLogos.twitter} alt="Twitter Logo" width={30} />}
        iconPos="left"
      ></ShareButton>
      <InformationItemContainer>
        <h5>{t('checkout.offsetEmission.success.with')}</h5>
        <h2 className="text-primary font-light">{t('common.icFootprint')}</h2>
      </InformationItemContainer>
    </FlexCenteredColumnContainer>
  );
};

export default CheckoutSuccess;
