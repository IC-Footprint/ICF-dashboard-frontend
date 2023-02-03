import axios from 'axios';

import type { AxiosResponse } from 'axios';

import type { NodeModel } from '@/models/nodes/node-model';

export class NodesApi {
  async getNodesLeaderboard(): Promise<NodeModel[]> {
    const response: AxiosResponse<NodeModel[]> = await axios.get(
      '/nodes/leaderboard'
    );
    return response.data;
  }
}

const nodesApi: NodesApi = new NodesApi();
export default nodesApi;
