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
        weeklyEmissions: (nodeProvider.weeklyEmissions) / 1000,
        operator: {
          name: nodeProvider.name,
          // TODO: use real icon in the future
          icon: categoryIcon
        },
        location: null,
        confidence: null,
        status: null,
        type: 'nodeProviders',
        icon: categoryIcon
      })
    );
  }

  static async mapProjects(
    projects: ProjectModel[],
    projectsEmissions: EmissionsModel[]
  ): Promise<CarbonAccountModel[]> {
    const mappedProjects: CarbonAccountModel[] = [];

    for (const project of projects) {
      let totalEmissions = 0;
      let weeklyEmissions = 0;

      // Assuming you have a function to fetch emissions by ID
      for (const id of project.id) {
        const emissions = projectsEmissions.find(
          (emission) => emission.name === id
        );
        if (emissions) {
          totalEmissions += emissions.totalEmissions;
          weeklyEmissions += emissions.weeklyEmissions;
        }
      }

      mappedProjects.push({
        id: project.id.join(','), // Join IDs into a single string or handle as needed
        operator: {
          name: project.name,
          icon: project.icon
        },
        carbonDebit: totalEmissions,
        status: 'UP', // TODO: use real status
        weeklyEmissions:  (weeklyEmissions)/1000,
        confidence: null,
        location: null,
        type: 'projects',
        icon: project.icon
      });
    }

    return mappedProjects;
  }
}
