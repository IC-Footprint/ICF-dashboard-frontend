import type { NodeModel } from '@/models/nodes/node-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import activityIcon from '@/theme/assets/activity-icon.svg';
import locationMapper from '@/utils/location-mapper';

export class NodesMappers {
  static mapNodeAccounts(node: NodeModel): CarbonAccountModel {
    return {
      id: node.id,
      operator: {
        icon: activityIcon,
        name: node.nodeProvider
      },
      carbonDebit: node.emissions,
      status: node.status,
      location: locationMapper.mapLocationName(node.location),
      confidence: 0, // TODO
      lastDayCarbonDifference: 0 // TODO
    };
  }
}
