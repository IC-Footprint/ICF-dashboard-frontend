export type TokenType = 'CAWATECH';

export interface PaymentDataModel {
  nodeId: string;
  carbonDebitAmount: number;
  tokenType: TokenType;
}

export const emptyPaymentModel = (): PaymentDataModel => {
  return {
    nodeId: '',
    carbonDebitAmount: 0,
    tokenType: 'CAWATECH'
  };
};
