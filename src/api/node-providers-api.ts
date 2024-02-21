import axios from 'axios';

import type { ElectricityDrawModel } from '@/models/electricity-draw-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { AxiosResponse } from 'axios';

export class NodeProvidersApi {
  async getNodeProviders(): Promise<EmissionsModel[]> {
    const response: AxiosResponse<EmissionsModel[]> = await axios.get(
      '/node-providers/getNodeProviderEmissions'
    );
    return response.data;
  }

  async getNodeProvidersElectricityDraw(): Promise<ElectricityDrawModel[]> {
    const response: AxiosResponse<ElectricityDrawModel[]> = await axios.get(
      '/node-providers/getNodeProviderElectricityDraws'
    );
    return response.data;
  }
}

const nodeProvidersApi = new NodeProvidersApi();
export default nodeProvidersApi;
