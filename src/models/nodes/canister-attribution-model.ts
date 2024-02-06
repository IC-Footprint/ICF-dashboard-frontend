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

export interface CanisterAttributionViewModel {
  id: string;
  registry: string;
  status: AttributionStatusType;
  type: string;
  creationDate: Date;
  transactionHash: string;
  confidence: number;
  url?: string;
}
