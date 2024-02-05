import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import NodeEmissions from '@/components/nodes/NodeEmissions';
import NodePowerConsumption from '@/components/nodes/NodePowerConsumtion';
import NodeStats from '@/components/nodes/NodeStats';
import useNodes from '@/helpers/state/useNodes';
import { FlexColumnContainer } from '@/theme/styled-components';

const Node: FC = () => {
  const { t } = useTranslation();
  const { nodeId } = useParams();
  const {
    actions: { getNodeDetails },
    nodeDetails
  } = useNodes();

  useEffect(() => {
    if (nodeId) {
      getNodeDetails(nodeId);
    }
  }, [nodeId, getNodeDetails]);

  return (
    <FlexColumnContainer>
      <h3>{t('nodes.machineId', { nodeId })}</h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard account={nodeDetails} />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard />
        </div>
        <div className="col-12">
          <NodeStats nodeId={nodeId || ''} />
        </div>
        <div className="col-12 lg:col-6">
          <NodeEmissions nodeId={nodeId || ''} />
        </div>
        <div className="col-12 lg:col-6">
          <NodePowerConsumption nodeId={nodeId || ''} />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Node;
