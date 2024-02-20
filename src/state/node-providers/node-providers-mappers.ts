import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

export class NodeProvidersMappers {
  static mapStatsToAccount(
    headlineFigures: HeadlineFiguresModel,
    nodeProviderName?: string
  ): CarbonAccountModel {
    return {
      weeklyEmissions: headlineFigures.weeklyEmissions,
      operator: nodeProviderName
        ? {
            name: nodeProviderName
          }
        : null,
      status: null,
      location: null,
      id: nodeProviderName ?? '',
      carbonDebit:
        headlineFigures.cumulativeNetworkEmissions -
        headlineFigures.avoidedEmissions,
      confidence: null
    };
  }
}
