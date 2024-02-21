import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type {
  NodesCountersModel,
  NodesCounterViewModel
} from '@/models/dashboard/nodes-counters-model';
import type { ProjectModel } from '@/models/dashboard/project-model';
import type { EmissionsModel } from '@/models/emissions-model';

import i18n from '@/i18n';
import categoryIcon from '@/theme/assets/category-icon.svg';

export class DashboardMappers {
  static mapDashboardNodesCounters(
    nodesCounters: NodesCountersModel
  ): NodesCounterViewModel[] {
    if (nodesCounters) {
      return Object.entries(nodesCounters).map((keyValue: [string, number]) => {
        return {
          label: i18n.t(`dashboard.nodesCounters.${keyValue[0]}`),
          value: keyValue[1]
        };
      });
    }
    return [];
  }

  static mapNodeProviders(
    nodeProviders: EmissionsModel[]
  ): CarbonAccountModel[] {
    return nodeProviders.map(
      (nodeProvider: EmissionsModel): CarbonAccountModel => ({
        id: nodeProvider.name,
        carbonDebit: nodeProvider.totalEmissions,
        weeklyEmissions: nodeProvider.weeklyEmissions,
        operator: {
          name: nodeProvider.name,
          // TODO: use real icon in the future
          icon: categoryIcon
        },
        location: null,
        confidence: null,
        status: null
      })
    );
  }

  static mapProjects(
    projects: ProjectModel[],
    projectsEmissions: EmissionsModel[]
  ): CarbonAccountModel[] {
    return projects.map((project: ProjectModel): CarbonAccountModel => {
      const emissions = projectsEmissions.find(
        (emission: EmissionsModel) => emission.name === project.id
      );
      return {
        id: project.id,
        operator: {
          name: project.name,
          icon: project.icon
        },
        carbonDebit: emissions?.totalEmissions ?? 0,
        status: null,
        weeklyEmissions: emissions?.weeklyEmissions ?? 0,
        confidence: null,
        location: null
      };
    });
  }
}
