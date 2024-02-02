import type { GridTechnologyType } from '@/models/nodes/grid-technology-type';
import type { NodeStatusType } from '@/models/nodes/node-status-type';

export interface NodeModel {
  id: string;
  nodeProvider: string;
  electricityDraw: number;
  carbonIntensity: number;
  emissions: number;
  location: string;
  status: NodeStatusType;
  dataCentreOwner: string;
  subnetId: string;
  gridTechnology: GridTechnologyType[];
}
