import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import { plugWallet } from '@/services/plug-service';
import { createActor as esgWalletCreateActor } from '@/declarations/esg_wallet';
// import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';
import getICPtoUSDRate from '@/services/neutriniteInteraction';


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

    // Step 1: Obtain the ICP to USD rate
    const icpToUSDRate = await getICPtoUSDRate();
    // console.log('ICP to USD Rate: ', icpToUSDRate);

    // Step 2: Define the figure value you mentioned (1 of it equals 0.00000001 ICP)
    const figureValue = 1; // This is just an example, replace with your actual figure value

    // Convert the figure value to ICP based on the current ICP to USD rate
    const figureValueInICP = figureValue / 0.00000001; // Assuming 1 of your figure equals 0.00000001 ICP

    // Calculate the ticket price in ICP using the adjusted figure value
    const ticketPriceInUSD = 0.161; // Example ticket price in USD
    const ticketPriceInICP = ticketPriceInUSD / icpToUSDRate;
    const adjustedTicketPriceInICP = ticketPriceInICP * figureValueInICP;

    // Step 3: Call the setTicketPrice method with the adjusted ticket price in ICP
    const ticket = await esgWalletActor.setTicketPrice(adjustedTicketPriceInICP);

    try {
        // Handle the response as needed
        console.log('Ticket price set successfully:', ticket);
    } catch (error) {
        console.error('Error setting ticket price:', error);
        throw error; // Rethrow the error or handle it as needed
    }


    const ticketPrice = await esgWalletActor.getTicketPrice();
    // Adjust the figure to ICP unit
    const adjustedFigure = paymentData.carbonDebitAmount / 100000000;
    const result = ticketPrice * adjustedFigure;
    return Number(result);
 }

 async registerPayment(paymentData: PaymentDataModel): Promise<boolean> {
  
  paymentData.totalCost = await this.calculateCost(paymentData);
  console.log('Total cost: ', paymentData.totalCost);
    if (!paymentData.totalCost) {
      console.log('Total cost is required');
      return false;
    }
    try {
      await plugWallet.makePayment(
      process.env.ESG_WALLET_CANISTER_ID ?? '',
      [paymentData.nodeId],
      paymentData.carbonDebitAmount,
      paymentData.totalCost,
    );
  } catch (error) {
    console.log('Error making payment:', error);
    return false;
  }
    console.log('Payment successful');
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