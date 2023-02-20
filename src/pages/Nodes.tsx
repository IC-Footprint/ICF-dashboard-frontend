import type { FC } from 'react';

import ElectricityDrawByTechnologyType from '@/components/nodes/ElectricityDrawByTechnologyType';
import NetworkEmissions from '@/components/nodes/NetworkEmissions';
import NodeEmissionsByRegion from '@/components/nodes/NodeEmissionsByRegion';
import NodesLeaderboard from '@/components/nodes/NodesLeaderboard';

const Nodes: FC = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <NetworkEmissions />
      </div>
      <div className="col-12 lg:col-6">
        <NodeEmissionsByRegion />
      </div>
      <div className="col-12 lg:col-6">
        <ElectricityDrawByTechnologyType />
      </div>
      <div className="col-12">
        <NodesLeaderboard />
      </div>
    </div>
  );
};

export default Nodes;
