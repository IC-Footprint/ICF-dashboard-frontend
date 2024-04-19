import type { AccountDataType } from '@/components/dashboard/carbon-accounts/AccountsDataView';
import type { NodeStatusType } from '@/models/nodes/node-status-type';

export interface OperatorModel {
  icon?: string;
  name: string;
}

export interface CarbonAccountModel {
  id: string;
  operator: OperatorModel | null;
  carbonDebit: number;
  weeklyEmissions: number;
  status: NodeStatusType | null;
  confidence: number | null;
  location: string | null;
  type: AccountDataType | null;
}

export function createEmptyCarbonAccountModel(): CarbonAccountModel {
  return {
    id: '',
    weeklyEmissions: 0,
    carbonDebit: 0,
    status: null,
    location: null,
    confidence: null,
    operator: null,
    type: null
  };
}
