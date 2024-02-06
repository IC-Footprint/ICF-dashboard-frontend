export type AttributionStatusType =
  | 'pending'
  | 'validated'
  | 'rejected'
  | 'complete';

export interface CanisterAttributionModel {
  id: string;
  registry: string;
  status: AttributionStatusType;
  type: string;
  timestamp: number;
  transactionHash: string;
  confidence: number;
  url?: string;
}
