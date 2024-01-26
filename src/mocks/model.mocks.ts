import type { OutstandingCarbonDebitModel } from '@/models/dashboard/outstanding-carbon-debit-model';

export class ModelMocks {
  static mockCarbonDebit(): OutstandingCarbonDebitModel {
    return {
      carbonDebit: 1000,
      weekDifferencePercentage: 10
    };
  }
}
