import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import { plugWallet } from '@/services/plug-service';
import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet';
import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';

export class PaymentApi {
 async calculateCost(paymentData: PaymentDataModel): Promise<number> {
    const esgWalletActor = esgWalletCreateActor(
      import.meta.env.VITE_APP_ESG_WALLET_CANISTER_ID ?? '',
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );
    const ticketPrice = await esgWalletActor.getTicketPrice();
    // Assuming the cost calculation involves ticket price
    // This is a placeholder for the actual calculation logic
    const result = ticketPrice * BigInt(paymentData.carbonDebitAmount);
    return Number(result);
 }

 async registerPayment(paymentData: PaymentDataModel): Promise<boolean> {
    if (!paymentData.totalCost) {
      return false;
    }
    // Make the payment using the plugWallet service
    try {
      await plugWallet.makePayment(
        import.meta.env.VITE_APP_ICP_LEDGER_CANISTER_ID ?? '',
        paymentData.carbonDebitAmount,
        paymentData.totalCost,
      );
      // Assuming the payment was successful trigger the register_payment method
      
      return true; // Payment was successful
    } catch (error) {
      console.error('Payment failed:', error);
      return false; // Payment failed
    }
  }

 async offsetEmissions(client: string, offset: number): Promise<string> {
    const nodeManagerActor = nodeManagerCreateActor(
      import.meta.env.VITE_APP_NODE_MANAGER_CANISTER_ID ?? '',
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
}

const paymentApi = new PaymentApi();
export default paymentApi;