import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

export class NetworkMappers {
  static mapStatsToAccount(
    headlineFigures: HeadlineFiguresModel
  ): CarbonAccountModel {
    return {
      lastDayCarbonDifference: headlineFigures.cumulativeNetworkEmissionsRate,
      operator: null,
      status: null,
      location: null,
      id: 'network',
      carbonDebit: headlineFigures.cumulativeNetworkEmissions,
      confidence: null
    };
  }
}
