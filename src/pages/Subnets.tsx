import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import EmissionsbySubnetType from '@/components/subnets/EmissionsbySubnetType';
import EmissionsbySubnet from '@/components/subnets/EmissionsbySubnet';
import { FlexColumnContainer } from '@/theme/styled-components';

const Subnets: FC = () => {
  const { t } = useTranslation();

  return (
    <FlexColumnContainer>
      <h3>{t('common.internetComputerFootprint')}</h3>
      <div className="grid">
        <div className="col-12">
          <EmissionsbySubnet />
        </div>
        <div className="col-12">
          <EmissionsbySubnetType />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Subnets;
