import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import ChartCard from '@/components/nodes/ChartCard';
import NodePowerConsumption from '@/components/nodes/NodePowerConsumtion';
import NodeStats from '@/components/nodes/NodeStats';
import useNodes from '@/helpers/state/useNodes';
import { FlexColumnContainer } from '@/theme/styled-components';

const Node: FC = () => {
  const { t } = useTranslation();
  const { nodeId } = useParams();
  const {
    actions: {
      getNodeDetails,
      getNodeStats,
      getNodeCanisterAttributions,
      getNodeEmissions
    },
    nodeDetails,
    nodeStats,
    canisterAttributions,
    isCanisterAttributionsLoading,
    nodeEmissions,
    nodeEmissionsLoading
  } = useNodes();

  useEffect(() => {
    if (nodeId) {
      getNodeDetails(nodeId);
      getNodeStats(nodeId);
      getNodeCanisterAttributions(nodeId);
    }
  }, [nodeId, getNodeDetails, getNodeStats, getNodeCanisterAttributions]);

  return (
    <FlexColumnContainer>
      <h3 className="text-lg text-color-secondary">
        {t('nodes.machineId', { nodeId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard account={nodeDetails} />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard />
        </div>
        <div className="col-12">
          <NodeStats stats={nodeStats} />
        </div>
        <div className="col-12">
          <AttributionsCard
            title={t('nodes.nodeCanisterAttributions')}
            list={canisterAttributions ?? []}
            isLoading={isCanisterAttributionsLoading}
          />
        </div>
        <div className="col-12 lg:col-6">
          <ChartCard
            label={t('nodes.nodeEmissions')}
            idFilter={nodeId ?? ''}
            data={nodeEmissions}
            getDataAction={getNodeEmissions}
            isLoading={nodeEmissionsLoading}
          />
        </div>
        <div className="col-12 lg:col-6">
          <NodePowerConsumption nodeId={nodeId ?? ''} />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Node;
