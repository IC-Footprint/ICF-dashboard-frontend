import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import type { PurchaseModel } from '@/models/payment/payment-data-model';

export class PaymentMappers {
  static mapPurchase(purchase: PurchaseModel): CanisterAttributionModel {
    return {
      id: '',
      payer: purchase.payer,
      ticketCount: Number(purchase.ticket_count),
      ticketPrice: Number(purchase.ticket_price),
      total:
        Number(purchase.ticket_price * purchase.ticket_count) *
        Math.pow(10, -8), // TODO: replace with ledger decimals
      type: 'carbonCredit',
      cawaUrl: 'https://registry.verra.org/app/projectDetail/VCS/609' // TODO: replace with dynamic URL
    };
  }
}
