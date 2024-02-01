import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { OutstandingCarbonDebitModel } from '@/models/dashboard/outstanding-carbon-debit-model';
import type { GlobalConfigurationModel } from '@/models/global-configuration-model';
import type { NodeStatus } from '@/models/nodes/node-status';

export class ModelMocks {
  static mockCarbonDebit(): OutstandingCarbonDebitModel {
    return {
      carbonDebit: 1000,
      weekDifferencePercentage: 10
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
        icon: `https://source.unsplash.com/random/200x200?sig=${id}`,
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
