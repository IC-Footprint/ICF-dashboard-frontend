import axios from 'axios';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { RangeType } from '@/models/range-type';
import type { AxiosResponse } from 'axios';

import { ModelMocks } from '@/mocks/model.mocks';

export class NodesApi {
  async getNodesList(): Promise<NodeModel[]> {
    const response: AxiosResponse<NodeModel[]> = await axios.get(
      '/nodes/leaderboard'
    );
    return response.data;
  }

  async getNetworkEmissions(range: RangeType | null): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/nodes/networkEmissions',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  async getNodeEmissionsByRegion(
    range: RangeType | null
  ): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/nodes/nodeEmissionsByRegion',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  async getNodeEmissionsByProvider(
    range: RangeType | null
  ): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/nodes/providerEmissions',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  async getElectricityDrawByTechnologyType(
    range: RangeType | null
  ): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/nodes/electricityDrawByTechnologyType',
      {
        params: {
          range: range
        }
      }
    );
    return response.data;
  }

  async getNodeStats(nodeId: string): Promise<HeadlineFiguresModel> {
    const response: AxiosResponse<HeadlineFiguresModel> = await axios.get(
      '/nodes/emissionsAndElectricity',
      {
        params: { nodeId }
      }
    );
    return response.data;
  }

  async getNodeEmissions(
    nodeId: string,
    range: RangeType | null
  ): Promise<DatasetModel[]> {
    const response: AxiosResponse<DatasetModel[]> = await axios.get(
      '/nodes/emissionsByNode',
      {
        params: {
          range,
          nodeId
        }
      }
    );
    return response.data;
  }

  // TODO: integrate
  async getNodeDetails(nodeId: string): Promise<NodeModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockNode(nodeId));
      }, 1000);
    });
  }

  // TODO: integrate
  async getCanisterAttributions(
    _id: string
  ): Promise<CanisterAttributionModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockCanisterAttributions());
      }, 1000);
    });
  }
}

const nodesApi: NodesApi = new NodesApi();
export default nodesApi;
