import { createSlice } from '@reduxjs/toolkit';

import type { NodeModel } from '@/models/nodes/node-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { getNodesLeaderboardAction } from '@/state/nodes/nodes-actions';

export interface NodesState {
  leaderboard: NodeModel[] | null;
  leaderboardLoading: boolean;
  leaderboardError: boolean;
  networkEmissions: DatasetModel[] | null;
  nodeEmissionsByRegion: DatasetModel[] | null;
  electricityDrawnByTechnologyType: DatasetModel[] | null;
}

const initialState: () => NodesState = () => ({
  electricityDrawnByTechnologyType: null,
  leaderboardLoading: false,
  leaderboardError: false,
  leaderboard: null,
  networkEmissions: null,
  nodeEmissionsByRegion: null
});

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    resetNodesLeaderboardAction: (state) => {
      state.leaderboardLoading = false;
      state.leaderboardError = false;
      state.leaderboard = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<NodesState>) => {
    /** Get nodes leaderboard **/
    builder
      .addCase(getNodesLeaderboardAction.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = false;
      })
      .addCase(getNodesLeaderboardAction.fulfilled, (state, { payload }) => {
        state.leaderboardLoading = false;
        state.leaderboard = payload;
      })
      .addCase(getNodesLeaderboardAction.rejected, (state) => {
        state.leaderboardLoading = false;
        state.leaderboardError = true;
      });
  }
});

export { getNodesLeaderboardAction };

export default nodesSlice.reducer;
