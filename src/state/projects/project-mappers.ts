import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { ElectricityDrawModel } from '@/models/electricity-draw-model';

export class ProjectMappers {
  static mapProjectStats(
    project: CarbonAccountModel,
    projectElectricityDraw?: ElectricityDrawModel
  ): HeadlineFiguresModel {
    return {
      weeklyEmissions: project.weeklyEmissions,
      cumulativeNetworkEmissions: project.carbonDebit,
      cumulativeElectricityDraw:
        projectElectricityDraw?.totalElectricityDraw ?? 0,
      avoidedEmissions: 0,
      cumulativeNetworkEmissionsRate: 0,
      offsetEmissions: 0
    };
  }
}
