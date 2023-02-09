import type { FC } from 'react';

import { NodesContainer, TwoColumnsGrid } from '@/theme/styled-components';
import ElectricityDrawByTechnologyType from '@/components/nodes/ElectricityDrawByTechnologyType';
import NetworkEmissions from '@/components/nodes/NetworkEmissions';
import NodeEmissionsByRegion from '@/components/nodes/NodeEmissionsByRegion';
import NodesLeaderboard from '@/components/nodes/NodesLeaderboard';

const Nodes: FC = () => {
  return (
    <NodesContainer>
      <NetworkEmissions />
      <TwoColumnsGrid>
        <NodeEmissionsByRegion />
        <ElectricityDrawByTechnologyType />
      </TwoColumnsGrid>
      <NodesLeaderboard />
    </NodesContainer>
  );
};

export default Nodes;
