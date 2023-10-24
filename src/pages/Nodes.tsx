import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import NetworkEmissions from '@/components/nodes/NetworkEmissions';
import NodeEmissionsByRegion from '@/components/nodes/NodeEmissionsByRegion';
import NodesLeaderboard from '@/components/nodes/NodesLeaderboard';
import { FlexColumnContainer } from '@/theme/styled-components';
import NodeEmissionsByProvider from '@/components/nodes/NodeEmissionsByProvider';

const Nodes: FC = () => {
  const { t } = useTranslation();

  return (
    <FlexColumnContainer>
      <h3>{t('common.internetComputerFootprint')}</h3>
      <div className="grid">
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
          <NodesLeaderboard />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Nodes;
