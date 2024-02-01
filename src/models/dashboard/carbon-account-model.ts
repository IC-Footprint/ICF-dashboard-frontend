import type { NodeStatus } from '@/models/nodes/node-status';

export interface OperatorModel {
  icon?: string;
  name: string;
}

// TODO: change name?
export interface CarbonAccountModel {
  id: string;
  operator: OperatorModel;
  carbonDebits: number;
  lastDayCarbonDifference: number;
  status: NodeStatus;
  confidence: number;
  location: string;
}
