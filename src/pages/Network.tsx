import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import EmissionsBySubnet from '@/components/network/EmissionsBySubnet';
import EmissionsBySubnetType from '@/components/network/EmissionsBySubnetType';
import NetworkEmissions from '@/components/network/NetworkEmissions';
import NodeEmissionsByProvider from '@/components/network/NodeEmissionsByProvider';
import NodeEmissionsByRegion from '@/components/network/NodeEmissionsByRegion';
import WorldCard from '@/components/network/WorldCard';
import NodeStats from '@/components/nodes/NodeStats';
import useNetwork from '@/helpers/state/useNetwork';
import { FlexColumnContainer } from '@/theme/styled-components';

const Network: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNetworkDetails, getNetworkAttributions },
    networkDetails,
    networkStats,
    networkAttributions,
    isNetworkAttributionsLoading
  } = useNetwork();

  useEffect(() => {
    if (!networkDetails) {
      getNetworkDetails();
    }
    if (!networkAttributions) {
      getNetworkAttributions();
    }
  }, [
    getNetworkAttributions,
    getNetworkDetails,
    networkAttributions,
    networkDetails
  ]);

  return (
    <FlexColumnContainer>
      <h3>{t('network.title')}</h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard account={networkDetails} />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard />
        </div>
        <div className="col-12">
          <NodeStats stats={networkStats} />
        </div>
        <div className="col-12">
          <AttributionsCard
            title={t('network.networkAttributions')}
            list={networkAttributions ?? []}
            isLoading={isNetworkAttributionsLoading}
          />
        </div>
        <div className="col-12">
          <WorldCard />
        </div>
        <div className="col-12">
          <NetworkEmissions />
        </div>
        <div className="col-12">
          <NodeEmissionsByRegion />
        </div>
        <div className="col-12">
          <NodeEmissionsByProvider />
        </div>
        <div className="col-12">
          <EmissionsBySubnet />
        </div>
        <div className="col-12">
          <EmissionsBySubnetType />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Network;
