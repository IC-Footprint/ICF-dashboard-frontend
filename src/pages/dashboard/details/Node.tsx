import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import ChartCard from '@/components/nodes/ChartCard';
import NodePowerConsumption from '@/components/nodes/NodePowerConsumtion';
import NodeStats from '@/components/nodes/NodeStats';
import useNodes from '@/helpers/state/useNodes';
import usePayment from '@/helpers/state/usePayment';
import useIncrementalValue from '@/helpers/useIntervalIncrement';
import { FlexColumnContainer } from '@/theme/styled-components';

const Node: FC = () => {
  const { t } = useTranslation();
  const { nodeId } = useParams();
  const {
    actions: {
      getNodeDetails,
      getNodeStats,
      getNodeCanisterAttributions,
      getNodeEmissions,
      resetNodeDetails
    },
    nodeDetails,
    nodeStats,
    canisterAttributions,
    isCanisterAttributionsLoading,
    nodeEmissions,
    nodeEmissionsLoading
  } = useNodes();
  const { paymentRegistered, payment } = usePayment();

  useEffect(() => {
    if (nodeId) {
      getNodeDetails(nodeId);
      getNodeStats(nodeId);
      getNodeCanisterAttributions(nodeId);
    }
    return () => {
      resetNodeDetails();
    };
  }, [
    nodeId,
    getNodeDetails,
    getNodeStats,
    getNodeCanisterAttributions,
    resetNodeDetails
  ]);

  useEffect(() => {
    if (nodeId && payment?.nodeId === nodeId && paymentRegistered) {
      getNodeCanisterAttributions(nodeId);
    }
  }, [payment, paymentRegistered, nodeId]);

  const incrementingNodeEmissions = useIncrementalValue(
    nodeDetails?.carbonDebit,
    nodeStats?.cumulativeNetworkEmissionsRate
  );

  const incrementingNodeDetails = useMemo((): CarbonAccountModel | null => {
    return nodeDetails
      ? {
          ...nodeDetails,
          carbonDebit: incrementingNodeEmissions ?? 0
        }
      : null;
  }, [nodeDetails, incrementingNodeEmissions]);

  const incrementingNodeStats = useMemo((): HeadlineFiguresModel | null => {
    return nodeStats
      ? {
          ...nodeStats,
          cumulativeNetworkEmissions: incrementingNodeEmissions ?? 0
        }
      : null;
  }, [nodeStats, incrementingNodeEmissions]);

  return (
    <FlexColumnContainer>
      <h3 className="text-lg text-color-secondary">
        {t('nodes.machineId', { nodeId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard
            account={incrementingNodeDetails}
            nameLabel={t('dashboard.carbonAccounts.nodeProvider') ?? ''}
          />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard nodeId={nodeId} />
        </div>
        <div className="col-12">
          <NodeStats stats={incrementingNodeStats} />
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
