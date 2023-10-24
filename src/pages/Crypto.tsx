import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import { FlexColumnContainer } from '@/theme/styled-components';
import CryptoEmissionsChart from '@/components/crypto/CryptoEmissionsChart';
import CryptoStats from '@/components/crypto/CryptoStats';
import CryptoConsumptionChart from '@/components/crypto/CryptoConsumptionChart';

const Nodes: FC = () => {
  const { t } = useTranslation();

  return (
    <FlexColumnContainer>
      <h3>{t('crypto.title')}</h3>
      <div className="grid">
        <div className="col-12">
          <CryptoEmissionsChart />
        </div>
        <div className="col-12">
          <CryptoConsumptionChart />
        </div>
        <div className="col-12">
          <CryptoStats />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Nodes;
