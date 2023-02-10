import axios from 'axios';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { AxiosResponse } from 'axios';

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
}

const dashboardApi: DashboardApi = new DashboardApi();
export default dashboardApi;
