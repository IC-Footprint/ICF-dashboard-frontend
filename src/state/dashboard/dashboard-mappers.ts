import type {
  NodesCountersModel,
  NodesCounterViewModel
} from '@/models/dashboard/nodes-counters-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import categoryIcon from '@/theme/assets/category-icon.svg';
import openChatIcon from '@/theme/assets/social-logos/open-chat-logo.png';
import i18n from '@/i18n';

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
    nodeProviders: CarbonAccountModel[]
  ): CarbonAccountModel[] {
    return nodeProviders.map((account: CarbonAccountModel) => ({
      ...account,
      operator: {
        ...account.operator,
        // TODO: use real icon in the future
        icon: account.operator.icon ?? categoryIcon
      }
    }));
  }

  static mapProjects(projects: CarbonAccountModel[]): CarbonAccountModel[] {
    return projects.map((account: CarbonAccountModel) => ({
      ...account,
      operator: {
        ...account.operator,
        // TODO: use real icon in the future
        icon: account.operator.icon ?? openChatIcon
      }
    }));
  }
}
