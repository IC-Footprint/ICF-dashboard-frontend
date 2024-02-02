import type { NodeStatusType } from '@/models/nodes/node-status-type';

export interface OperatorModel {
  icon?: string;
  name: string;
}

// TODO: change name?
export interface CarbonAccountModel {
  id: string;
  operator: OperatorModel;
  carbonDebit: number;
  lastDayCarbonDifference: number;
  status: NodeStatusType;
  confidence: number;
  location: string;
}
