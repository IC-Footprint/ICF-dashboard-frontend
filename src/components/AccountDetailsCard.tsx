import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { FC } from 'react';

import TrendValue from '@/components/dashboard/TrendValue';
import NodeStatus from '@/components/nodes/NodeStatus';
import gradientBackground from '@/theme/assets/gradient-background.png';
import icLogo from '@/theme/assets/ic-logo.png';
import {
  FlexColumnContainer,
  StyledCard,
  FlexRowContainer,
  LightTag
} from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

interface AccountDetailsProps {
  account: CarbonAccountModel | null;
}

const CardContentContainer = styled(FlexColumnContainer)`
  align-items: center;
  padding: 0 2rem;

  h5 {
    font-size: 1rem;
  }

  p {
    font-size: 1.25rem;
    font-weight: bold;
  }

  img {
    max-width: 4rem;
  }
`;

const AccountDetailsContainer = styled(StyledCard)`
  background: url(${gradientBackground}) center;
  background-size: cover;
`;

const AccountDetailsCard: FC<AccountDetailsProps> = ({ account }) => {
  const { t } = useTranslation();

  return (
    <AccountDetailsContainer>
      <CardContentContainer className="grid">
        <div className="col-12 text-center">
          <img src={icLogo} alt="IC Logo" />
        </div>
        <div className="col-12 text-center">
          <h5 className="text-lg">
            {t('dashboard.carbonAccounts.carbonDebit')}
          </h5>
          <p className="text-3xl">
            {account?.carbonDebit
              ? NumberUtils.formatNumber(account.carbonDebit)
              : '-'}
            <span className="text-sm font-normal text-color-secondary">
              {t('common.unit.co2Kg', {
                value: ''
              })}
            </span>
          </p>
        </div>
        <LightTag>
          <FlexRowContainer>
            <TrendValue differenceValue={account?.lastDayCarbonDifference} />
            <span>
              {t('common.unit.kgPerDay', {
                value: ''
              })}
            </span>
          </FlexRowContainer>
        </LightTag>
        <div className="col-12 flex justify-content-between">
          <div>
            <h5>{t('dashboard.carbonAccounts.nodeProvider')}</h5>
            <p>{account?.operator?.name ?? '-'}</p>
          </div>
          <div>
            <h5>{t('common.status')}</h5>
            {account?.status ? <NodeStatus status={account.status} /> : '-'}
          </div>
        </div>
      </CardContentContainer>
    </AccountDetailsContainer>
  );
};

export default AccountDetailsCard;
