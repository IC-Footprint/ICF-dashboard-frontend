import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import NodeStats from '@/components/nodes/NodeStats';
import useNodeProviders from '@/helpers/state/useNodeProviders';
import useIncrementalValue from '@/helpers/useIntervalIncrement';
import { FlexColumnContainer } from '@/theme/styled-components';

const NodeProvider: FC = () => {
  const { t } = useTranslation();
  const { nodeProviderId } = useParams();
  const {
    actions: { getNodeProviderDetails, getNodeProviderCanisterAttributions },
    nodeProvider,
    nodeProviderStats,
    nodeProviderCanisterAttributions,
    isNodeProviderCanisterAttributionsLoading
  } = useNodeProviders();

  useEffect(() => {
    if (nodeProviderId) {
      getNodeProviderDetails(nodeProviderId);
      getNodeProviderCanisterAttributions(nodeProviderId);
    }
  }, [
    getNodeProviderDetails,
    getNodeProviderCanisterAttributions,
    nodeProviderId
  ]);

  const incrementingNodeProviderEmissions = useIncrementalValue(
    nodeProvider?.carbonDebit,
    nodeProviderStats?.cumulativeNetworkEmissionsRate
  );

  const incrementingNodeProvider = useMemo((): CarbonAccountModel | null => {
    return nodeProvider
      ? {
          ...nodeProvider,
          carbonDebit: incrementingNodeProviderEmissions ?? 0
        }
      : null;
  }, [nodeProvider, incrementingNodeProviderEmissions]);

  const incrementingNodeProviderStats =
    useMemo((): HeadlineFiguresModel | null => {
      return nodeProviderStats
        ? {
            ...nodeProviderStats,
            cumulativeNetworkEmissions: incrementingNodeProviderEmissions ?? 0
          }
        : null;
    }, [nodeProviderStats, incrementingNodeProviderEmissions]);

  return (
    <FlexColumnContainer>
      <h3 className="text-lg text-color-secondary">
        {t('nodeProvider.machineId', { nodeProviderId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard account={incrementingNodeProvider} />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard />
        </div>
        <div className="col-12">
          <NodeStats stats={incrementingNodeProviderStats} />
        </div>
        <div className="col-12">
          <AttributionsCard
            title={t('nodeProvider.nodeProviderAttributions')}
            list={nodeProviderCanisterAttributions ?? []}
            isLoading={isNodeProviderCanisterAttributionsLoading}
          />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default NodeProvider;
