import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import type { FC } from 'react';

import { FlexColumnContainer } from '@/theme/styled-components';
import NodeStats from '@/components/nodes/NodeStats';
import NodeEmissions from '@/components/nodes/NodeEmissions';
import NodePowerConsumption from '@/components/nodes/NodePowerConsumtion';

const Node: FC = () => {
  const { t } = useTranslation();
  const { nodeId } = useParams();

  return (
    <FlexColumnContainer>
      <h3>{t('nodes.machineId', { nodeId })}</h3>
      <NodeStats nodeId={nodeId || ''} />
      <div className="grid">
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
