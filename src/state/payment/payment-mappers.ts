import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import type { PurchaseModel } from '@/models/payment/payment-data-model';

export class PaymentMappers {
  static mapPurchase(purchase: PurchaseModel): CanisterAttributionModel {
    return {
      id: '',
      payer: purchase.payer,
      ticketCount: purchase.ticket_count,
      ticketPrice: purchase.ticket_price,
      total:
        (purchase.ticket_price * purchase.ticket_count) *
        Math.pow(10, -8), // TODO: replace with ledger decimals
      type: 'carbonCredit',
      cawaUrl: purchase.cawa_url
    };
  }
}
