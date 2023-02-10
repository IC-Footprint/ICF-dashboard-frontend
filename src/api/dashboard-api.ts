import axios from 'axios';

import type { AxiosResponse } from 'axios';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

export class DashboardApi {
  async getDashboardHeadlineFigures(): Promise<HeadlineFiguresModel> {
    const response: AxiosResponse<HeadlineFiguresModel> = await axios.get(
      '/dashboard/counters/emissionsAndElectricity'
    );
    return response.data;
  }
}

const dashboardApi: DashboardApi = new DashboardApi();
export default dashboardApi;
