import { createSlice } from '@reduxjs/toolkit';

import type { Draft } from 'immer';
import type { DatasetModel } from '@/models/dataset-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChartData } from 'chart.js';

import {
  getNetworkEmissionsAction,
  getNodesLeaderboardAction
} from '@/state/nodes/nodes-actions';

export interface NodesState {
  leaderboard: NodeModel[] | null;
  leaderboardLoading: boolean;
  leaderboardError: boolean;
  networkEmissions: ChartData | null;
  networkEmissionsLoading: boolean;
  networkEmissionsError: boolean;
  nodeEmissionsByRegion: DatasetModel[] | null;
  electricityDrawnByTechnologyType: DatasetModel[] | null;
}

const initialState: () => NodesState = () => ({
  electricityDrawnByTechnologyType: null,
  leaderboardLoading: false,
  leaderboardError: false,
  leaderboard: null,
  networkEmissions: null,
  networkEmissionsLoading: false,
  networkEmissionsError: false,
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
    },
    resetNetworkEmissionsAction: (state) => {
      state.networkEmissionsLoading = false;
      state.networkEmissionsError = false;
      state.networkEmissions = null;
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

    /** Get network emissions **/
    builder
      .addCase(getNetworkEmissionsAction.pending, (state) => {
        state.networkEmissionsLoading = true;
        state.networkEmissionsError = false;
      })
      .addCase(getNetworkEmissionsAction.fulfilled, (state, { payload }) => {
        state.networkEmissionsLoading = false;
        state.networkEmissions = payload as Draft<ChartData>;
      })
      .addCase(getNetworkEmissionsAction.rejected, (state) => {
        state.networkEmissionsLoading = false;
        state.networkEmissionsError = true;
      });
  }
});

export { getNodesLeaderboardAction };

export default nodesSlice.reducer;
