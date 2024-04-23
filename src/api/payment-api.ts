import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import { plugWallet } from '@/services/plug-service';
import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet';
// import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';


import { PaymentMappers } from '@/state/payment/payment-mappers';

export class PaymentApi {
 async calculateCost(paymentData: PaymentDataModel): Promise<number> {
  const esgWallet = process.env.ESG_WALLET_CANISTER_ID ?? '';
  // console.log('ESG Wallet: ', esgWallet);
    const esgWalletActor = esgWalletCreateActor(
      esgWallet,
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );
    const ticketPrice = await esgWalletActor.getTicketPrice();
    // Adjust the figure to ICP unit
    const adjustedFigure = paymentData.carbonDebitAmount / 100000000;
    const result = ticketPrice * adjustedFigure;
    return Number(result);
 }

 async registerPayment(paymentData: PaymentDataModel): Promise<boolean> {
  
  paymentData.totalCost = await this.calculateCost(paymentData);
  // console.log('Total cost: ', paymentData.totalCost);
    if (!paymentData.totalCost) {
      console.log('Total cost is required');
      return false;
    }
    await plugWallet.makePayment(
      process.env.ESG_WALLET_CANISTER_ID ?? '',
      [paymentData.nodeId],
      paymentData.carbonDebitAmount,
      paymentData.totalCost,
    );
    // console.log('Payment successful');
    return true;
  }


async getPurchases(nodeId: string): Promise<CanisterAttributionModel[]> {
  const esgWalletActor = esgWalletCreateActor(
    process.env.ESG_WALLET_CANISTER_ID ?? '',
      {
          agentOptions: {
              host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
          }
      }
  );
  const result = await esgWalletActor.getPurchasesByNodeId(nodeId);
  return result.map(PaymentMappers.mapPurchase);
}
}

const paymentApi = new PaymentApi();
export default paymentApi;