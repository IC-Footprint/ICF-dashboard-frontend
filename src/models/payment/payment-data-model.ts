import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

export type TokenType = 'CAWATECH';

export interface PaymentDataModel {
  nodeId: string;
  carbonDebitAmount: number;
  tokenType: TokenType;
  totalCost?: number;
  account?: CarbonAccountModel;
}

export const emptyPaymentModel = (): PaymentDataModel => {
  return {
    nodeId: '',
    carbonDebitAmount: 0,
    tokenType: 'CAWATECH'
  };
};

export interface PurchaseModel {
  ticket_price: number;
  payer: string;
  block_height: bigint;
  ticket_count: number;
  cawa_url: string;
}
