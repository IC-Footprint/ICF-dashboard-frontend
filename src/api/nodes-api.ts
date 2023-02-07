import axios from 'axios';

import type { AxiosResponse } from 'axios';
import type { DatasetModel } from '@/models/dataset-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { RangeType } from '@/models/range-type';

export class NodesApi {
  async getNodesLeaderboard(): Promise<NodeModel[]> {
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
}

const nodesApi: NodesApi = new NodesApi();
export default nodesApi;
