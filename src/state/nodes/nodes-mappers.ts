import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { NodeModel } from '@/models/nodes/node-model';

import activityIcon from '@/theme/assets/activity-icon.svg';
import locationMapper from '@/utils/location-mapper';

export class NodesMappers {
  static mapNodeAccounts(
    nodesEmissions: EmissionsModel[]
  ): (node?: NodeModel) => CarbonAccountModel {
    return (node?: NodeModel) => {
      const emissions = nodesEmissions.find(
        (emission) => emission.name === node?.id
      );
      return {
        id: node?.id ?? '',
        operator: {
          icon: activityIcon,
          name: node?.nodeProvider ?? ''
        },
        carbonDebit: emissions?.totalEmissions ?? 0,
        status: node?.status || null,
        location: node?.location
          ? locationMapper.mapLocationName(node.location)
          : null,
        weeklyEmissions: emissions?.weeklyEmissions ?? 0,
        confidence: 0 // TODO
      };
    };
  }
}
