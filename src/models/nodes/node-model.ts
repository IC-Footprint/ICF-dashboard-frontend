import type { GridTechnologyType } from '@/models/nodes/grid-technology-type';
import type { NodeStatus } from '@/models/nodes/node-status';

export interface NodeModel {
  id: string;
  nodeProvider: string;
  electricityDraw: number;
  carbonIntensity: number;
  emissions: number;
  location: string;
  status: NodeStatus;
  dataCentreOwner: string;
  subnetId: string;
  gridTechnology: GridTechnologyType[];
}
