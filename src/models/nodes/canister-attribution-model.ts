export type AttributionStatusType =
  | 'pending'
  | 'validated'
  | 'rejected'
  | 'complete';

export interface CanisterAttributionModel {
  id: string;
  payer: string;
  ticketPrice: number;
  ticketCount: number;
  total: number;
}
