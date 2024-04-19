import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

export class NetworkMappers {
  static mapNetworkStatsToAccount(
    headlineFigures: HeadlineFiguresModel
  ): CarbonAccountModel {
    return {
      weeklyEmissions: headlineFigures.weeklyEmissions,
      operator: {
        name: 'Internet Computer Protocol'
      },
      status: 'UP',
      location: null,
      id: 'network',
      carbonDebit: headlineFigures.cumulativeNetworkEmissions,
      confidence: null,
      type: null
    };
  }
}
