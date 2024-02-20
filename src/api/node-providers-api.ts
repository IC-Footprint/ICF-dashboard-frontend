import axios from 'axios';

import type { NodeProviderElectricityDrawModel } from '@/models/node-providers/node-provider-electricity-draw-model';
import type { NodeProviderModel } from '@/models/node-providers/node-provider-model';
import type { AxiosResponse } from 'axios';

export class NodeProvidersApi {
  async getNodeProviders(): Promise<NodeProviderModel[]> {
    const response: AxiosResponse<NodeProviderModel[]> = await axios.get(
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
