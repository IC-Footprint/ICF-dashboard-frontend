import axios from 'axios';

import type { AxiosResponse } from 'axios';
import type { DatasetModel } from '@/models/dataset-model';
import type { RangeType } from '@/models/range-type';

export class SubnetsApi {
  async getEmissionsByType(
    range: RangeType | null
  ): Promise<DatasetModel[]> {
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

  async getEmissionsBySubnet(
    range: RangeType | null
  ): Promise<DatasetModel[]> {
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
}

const subnetsApi: SubnetsApi = new SubnetsApi();
export default subnetsApi;
