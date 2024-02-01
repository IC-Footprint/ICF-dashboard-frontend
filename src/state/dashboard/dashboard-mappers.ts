import type {
  NodesCountersModel,
  NodesCounterViewModel
} from '@/models/dashboard/nodes-counters-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

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

  static mapNodesAccounts(nodes: NodeModel[]): CarbonAccountModel[] {
    return nodes.map((node: NodeModel): CarbonAccountModel => {
      return {
        id: node.id,
        operator: {
          icon: '',
          name: node.nodeProvider
        },
        carbonDebits: node.emissions,
        status: node.status,
        location: node.location,
        confidence: 0, // TODO
        lastDayCarbonDifference: 0 // TODO
      };
    });
  }
}
