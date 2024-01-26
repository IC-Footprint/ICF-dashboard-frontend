import axios from 'axios';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { NodesCountersModel } from '@/models/dashboard/nodes-counters-model';
import type { AxiosResponse } from 'axios';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';
import type { OutstandingCarbonDebitModel } from '@/models/dashboard/outstanding-carbon-debit-model';

export class DashboardApi {
  async getDashboardHeadlineFigures(): Promise<HeadlineFiguresModel> {
    const response: AxiosResponse<HeadlineFiguresModel> = await axios.get(
      '/dashboard/counters/emissionsAndElectricity'
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

  async getDashboardCarbonDebit(): Promise<OutstandingCarbonDebitModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          carbonDebit: 10320000,
          weekDifferencePercentage: 10
        } as OutstandingCarbonDebitModel);
      }, 500);
    });
  }
}

const dashboardApi: DashboardApi = new DashboardApi();
export default dashboardApi;
