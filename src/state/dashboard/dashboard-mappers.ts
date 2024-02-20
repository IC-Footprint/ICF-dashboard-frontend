import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type {
  NodesCountersModel,
  NodesCounterViewModel
} from '@/models/dashboard/nodes-counters-model';
import type { EmissionsModel } from '@/models/emissions-model';

import i18n from '@/i18n';
import categoryIcon from '@/theme/assets/category-icon.svg';
import openChatIcon from '@/theme/assets/social-logos/open-chat-logo.png';

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

  static mapProjects(projects: CarbonAccountModel[]): CarbonAccountModel[] {
    return projects.map((account: CarbonAccountModel) => ({
      ...account,
      operator: account.operator
        ? {
            ...account.operator,
            // TODO: use real icon in the future
            icon: account.operator.icon ?? openChatIcon
          }
        : null
    }));
  }
}
