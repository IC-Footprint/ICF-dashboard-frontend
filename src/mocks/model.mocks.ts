import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { GlobalConfigurationModel } from '@/models/global-configuration-model';
import type { NodeStatus } from '@/models/nodes/node-status';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

export class ModelMocks {
  static mockHeadlineFigures(): HeadlineFiguresModel {
    return {
      avoidedEmissions: 1000,
      cumulativeElectricityDraw: 100,
      cumulativeNetworkEmissions: 300,
      cumulativeNetworkEmissionsRate: 0.5,
      offsetEmissions: 123
    };
  }

  static mockIcon(): IconModel {
    return {
      icon: 'icon-data',
      name: 'icon name',
      url: 'http://localhost/icon-url'
    };
  }

  static mockGlobalConfiguration(): GlobalConfigurationModel {
    return {
      links: {
        discord: 'http://localhost/discord-link',
        openChat: 'http://localhost/open-chat-link',
        twitter: 'http://localhost/twitter-link',
        sustainabilityReport: 'http://localhost/sustainability-report-link'
      }
    };
  }

  static mockNodeElement(id: string, status: NodeStatus): CarbonAccountModel {
    return {
      id: id,
      operator: {
        name: 'Aviate Labs'
      },
      carbonDebits: 10320000,
      lastDayCarbonDifference: +Math.random().toFixed(2),
      status: status,
      confidence: +Math.random().toFixed(2),
      location: 'USA'
    };
  }

  static mockNodeElementsList(): CarbonAccountModel[] {
    return new Array(25).fill(null).map((_, index) => {
      return this.mockNodeElement(String(index + 1), 'UP');
    });
  }
}
