import axios from 'axios';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { NodesCountersModel } from '@/models/dashboard/nodes-counters-model';
import type { DiscreteValueModel } from '@/models/discrete-value-model';
import type { AxiosResponse } from 'axios';

import { ModelMocks } from '@/mocks/model.mocks';

export class DashboardApi {
  async getDashboardHeadlineFigures(): Promise<HeadlineFiguresModel> {
    const response: AxiosResponse<HeadlineFiguresModel> = await axios.get(
      '/dashboard/counters/emissionsAndElectricity'
    );
    return response.data;
  }

  async getTotalPercentChangeOverLastWeek(): Promise<DiscreteValueModel> {
    const response: AxiosResponse<DiscreteValueModel> = await axios.get(
      '/node-providers/getTotalPercentChangeOverLastWeek'
    );
    return response.data;
  }

  async getLocationsLeaderboard(): Promise<LocationEmissionsModel[]> {
    const response: AxiosResponse<LocationEmissionsModel[]> = await axios.get(
      '/dashboard/locations'
    );
    return response.data;
  }

  async getNodesCounters(): Promise<NodesCountersModel> {
    const response: AxiosResponse<NodesCountersModel> = await axios.get(
      '/dashboard/counters/nodes'
    );
    return response.data;
  }

  async getGlobePoints(): Promise<GlobePointModel[]> {
    const response: AxiosResponse<GlobePointModel[]> = await axios.get(
      '/dashboard/globePoints'
    );
    return response.data;
  }

  // TODO: integrate
  async getProjects(): Promise<CarbonAccountModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([ModelMocks.mockNodeElement('1', 'UP')]);
      }, 1000);
    });
  }
}

const dashboardApi: DashboardApi = new DashboardApi();
export default dashboardApi;
