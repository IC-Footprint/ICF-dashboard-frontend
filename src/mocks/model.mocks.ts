import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { OutstandingCarbonDebitModel } from '@/models/dashboard/outstanding-carbon-debit-model';
import type { GlobalConfigurationModel } from '@/models/global-configuration-model';

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
}
