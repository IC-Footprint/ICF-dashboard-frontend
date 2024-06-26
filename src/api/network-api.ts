import axios from 'axios';

import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { RangeType } from '@/models/range-type';
import type { AxiosResponse } from 'axios';

interface DailyNetworkEmissionsResponse {
  cumulativeNetworkEmissions: number;
}

export class NetworkApi {
  async getEmissionsByType(range: RangeType | null): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/subnets/subnetEmissionsByType',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  async getEmissionsBySubnet(range: RangeType | null): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/subnets/subnetEmissions',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  // geet daily Network emisssions
  async getDailyNetworkEmissions(): Promise<DailyNetworkEmissionsResponse> {
    const response: AxiosResponse<DailyNetworkEmissionsResponse> =
      await axios.get('/dashboard/counters/dailyNetworkEmissions');
    return response.data;
  }

  // TODO: integrate
  async getNetworkAttributions(): Promise<CanisterAttributionModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }
}

const networkApi: NetworkApi = new NetworkApi();
export default networkApi;
