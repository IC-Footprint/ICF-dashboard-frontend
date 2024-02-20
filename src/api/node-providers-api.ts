import axios from 'axios';

import type { NodeProviderElectricityDrawModel } from '@/models/node-providers/node-provider-electricity-draw-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { AxiosResponse } from 'axios';

export class NodeProvidersApi {
  async getNodeProviders(): Promise<EmissionsModel[]> {
    const response: AxiosResponse<EmissionsModel[]> = await axios.get(
      '/node-providers/getNodeProviderEmissions'
    );
    return response.data;
  }

  async getNodeProvidersElectricityDraw(): Promise<
    NodeProviderElectricityDrawModel[]
  > {
    const response: AxiosResponse<NodeProviderElectricityDrawModel[]> =
      await axios.get('/node-providers/getNodeProviderElectricityDraws');
    return response.data;
  }
}

const nodeProvidersApi = new NodeProvidersApi();
export default nodeProvidersApi;
