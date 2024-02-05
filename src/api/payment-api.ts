import type { PaymentDataModel } from '@/models/payment/payment-data-model';

// TODO: integrate
export class PaymentApi {
  async calculateCost(paymentData: PaymentDataModel): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(paymentData.carbonDebitAmount * 2);
      }, 1000);
    });
  }

  async registerPayment(_paymentData: PaymentDataModel): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}

const paymentApi = new PaymentApi();
export default paymentApi;
