import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { GlobalConfigurationModel } from '@/models/global-configuration-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { NodeStatusType } from '@/models/nodes/node-status-type';

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
        sustainabilityReport: 'http://localhost/sustainability-report-link',
        greenEnergyQuote: 'http://localhost/green-energy-quote-link',
        priorCommitmentForm: 'http://localhost/prio-commitment-form-link',
        scheduleCall: 'http://localhost/schedule-call-link',
        internetComputerDashboard:
          'http://localhost/internet-computer-dashboard-link'
      }
    };
  }

  static mockNodeElement(
    id: string,
    status: NodeStatusType
  ): CarbonAccountModel {
    return {
      id: id,
      operator: {
        name: 'Aviate Labs'
      },
      carbonDebit: 10320000,
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

  static mockNode(
    id = '2ew2x-bmzxs-o6sw6-xbxv6-efhzc-47y5k-vy5ce-luaqo-lecdi-33z4i-gqe'
  ): NodeModel {
    return {
      id,
      emissions: 120020.3252321,
      gridTechnology: [],
      nodeProvider: 'Allusion',
      location: 'BE',
      status: 'UP',
      electricityDraw: 285,
      carbonIntensity: 0.3311601852849294,
      dataCentreOwner: 'Owner',
      subnetId: 'subnet-id'
    };
  }

  static mockCanisterAttribution(id: string): CanisterAttributionModel {
    return {
      id,
      payer: '',
      ticketCount: Math.random() * 100,
      ticketPrice: Math.random() * 100,
      total: Math.random() * 100 + 100
    };
  }

  static mockCanisterAttributions(): CanisterAttributionModel[] {
    return new Array(25).fill(null).map((_, index) => {
      return this.mockCanisterAttribution(String(index + 1));
    });
  }

  static mockDataset(dataSetName: string): DatasetModel {
    const emptyArray = Array(10).fill(null);
    return {
      dataSetName,
      labels: emptyArray.map((_, index) => {
        return String(index + 1);
      }),
      data: emptyArray.map(() => {
        return Math.random() * 100;
      }),
      active: true
    };
  }

  static mockDatasetList(): DatasetModel[] {
    return new Array(5).fill(null).map((_, index) => {
      return ModelMocks.mockDataset(`Emission ${index + 1}`);
    });
  }
}
