import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import NodeStats from '@/components/nodes/NodeStats';
import useNodeProviders from '@/helpers/state/useNodeProviders';
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

  return (
    <FlexColumnContainer>
      <h3 className="text-lg text-color-secondary">
        {t('nodeProvider.machineId', { nodeProviderId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard account={nodeProvider} />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard />
        </div>
        <div className="col-12">
          <NodeStats stats={nodeProviderStats} />
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
