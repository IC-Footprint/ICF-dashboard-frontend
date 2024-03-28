import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import { plugWallet } from '@/services/plug-service';
import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet';
import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';

export class PaymentApi {
 async calculateCost(paymentData: PaymentDataModel): Promise<number> {
  const esgWallet = process.env.ESG_WALLET_CANISTER_ID ?? '';
  console.log('ESG Wallet: ', esgWallet);
    const esgWalletActor = esgWalletCreateActor(
      esgWallet,
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );
    const ticketPrice = await esgWalletActor.getTicketPrice();
    // Assuming the cost calculation involves ticket price
    const result = ticketPrice * BigInt(paymentData.carbonDebitAmount);
    return Number(result);
 }

 async registerPayment(paymentData: PaymentDataModel): Promise<boolean> {
  
  paymentData.totalCost = await this.calculateCost(paymentData);
  console.log('Total cost: ', paymentData.totalCost);
    if (!paymentData.totalCost) {
      console.log('Total cost is required');
      return false;
    }
    await plugWallet.makePayment(
      process.env.ESG_WALLET_CANISTER_ID ?? '',
      paymentData.carbonDebitAmount,
      paymentData.totalCost
    );
    return true;
  }

 async offsetEmissions(client: string, offset: number): Promise<string> {
    const nodeManagerActor = nodeManagerCreateActor(
      process.env.NODE_MANAGER_CANISTER_ID ?? '',
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );

    const result = await nodeManagerActor.offset_emissions({
      client,
      nodes: [], // Assuming nodes are not directly manipulated here
    }, offset, []);
    return result;
 }


async getPurchases(nodeId: string): Promise<any[]> {
  const esgWalletActor = esgWalletCreateActor(
    process.env.ESG_WALLET_CANISTER_ID ?? '',
      {
          agentOptions: {
              host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
          }
      }
  );

  const purchases = await esgWalletActor.getPurchasesByNodeId(nodeId);

  return purchases;
}
}

const paymentApi = new PaymentApi();
export default paymentApi;