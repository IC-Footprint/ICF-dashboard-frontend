import type { NodeStatusType } from '@/models/nodes/node-status-type';

export interface OperatorModel {
  icon?: string;
  name: string;
}

// TODO: change name?
export interface CarbonAccountModel {
  id: string;
  operator: OperatorModel | null;
  carbonDebit: number;
  weeklyEmissions: number;
  status: NodeStatusType | null;
  confidence: number | null;
  location: string | null;
}
