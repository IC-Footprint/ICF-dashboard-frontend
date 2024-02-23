export type AttributionType = 'carbonCredit';

export interface CanisterAttributionModel {
  id: string;
  payer: string;
  ticketPrice: number;
  ticketCount: number;
  total: number;
  type: AttributionType;
  cawaUrl: string;
}
