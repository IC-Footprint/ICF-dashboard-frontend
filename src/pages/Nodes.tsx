import type { FC } from 'react';

import { TwoColumnsGrid } from '@/theme/styled-components';
import ElectricityDrawByTechnologyType from '@/components/nodes/ElectricityDrawByTechnologyType';
import NodeEmissionsByRegion from '@/components/nodes/NodeEmissionsByRegion';
import NetworkEmissions from '@/components/nodes/NetworkEmissions';

const Nodes: FC = () => {
  return (
    <div>
      <NetworkEmissions />
      <TwoColumnsGrid>
        <NodeEmissionsByRegion />
        <ElectricityDrawByTechnologyType />
      </TwoColumnsGrid>
    </div>
  );
};

export default Nodes;
