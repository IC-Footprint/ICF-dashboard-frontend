import { createSlice } from '@reduxjs/toolkit';

import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { NodeModel } from '@/models/nodes/node-model';
import type { ChartData } from 'chart.js';
import type { Draft } from 'immer';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

import {
  getElectricityDrawByTechnologyTypeAction,
  getNetworkEmissionsAction,
  getNodeEmissionsByRegionAction,
  getNodesLeaderboardAction,
  getNodeStatsAction,
  getNodeEmissionsAction
} from '@/state/nodes/nodes-actions';

export interface NodesState {
  leaderboard: NodeModel[] | null;
  leaderboardLoading: boolean;
  leaderboardError: boolean;
  networkEmissions: ChartData | null;
  networkEmissionsLoading: boolean;
  networkEmissionsError: boolean;
  nodeEmissionsByRegion: ChartData | null;
  nodeEmissionsByRegionLoading: boolean;
  nodeEmissionsByRegionError: boolean;
  electricityDrawByTechnologyType: ChartData | null;
  electricityDrawByTechnologyTypeLoading: boolean;
  electricityDrawByTechnologyTypeError: boolean;
  nodeStats: HeadlineFiguresModel | null;
  nodeStatsLoading: boolean;
  nodeEmissions: ChartData | null;
  nodeEmissionsLoading: boolean;
}

const initialState: () => NodesState = () => ({
  electricityDrawByTechnologyType: null,
  electricityDrawByTechnologyTypeLoading: false,
  electricityDrawByTechnologyTypeError: false,
  leaderboardLoading: false,
  leaderboardError: false,
  leaderboard: null,
  networkEmissions: null,
  networkEmissionsLoading: false,
  networkEmissionsError: false,
  nodeEmissionsByRegion: null,
  nodeEmissionsByRegionLoading: false,
  nodeEmissionsByRegionError: false,
  nodeStats: null,
  nodeStatsLoading: false,
  nodeEmissions: null,
  nodeEmissionsLoading: false
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

    /** Get node emissions by region **/
    builder
      .addCase(getNodeEmissionsByRegionAction.pending, (state) => {
        state.nodeEmissionsByRegionLoading = true;
        state.nodeEmissionsByRegionError = false;
      })
      .addCase(
        getNodeEmissionsByRegionAction.fulfilled,
        (state, { payload }) => {
          state.nodeEmissionsByRegionLoading = false;
          state.nodeEmissionsByRegion = payload as Draft<ChartData>;
        }
      )
      .addCase(getNodeEmissionsByRegionAction.rejected, (state) => {
        state.nodeEmissionsByRegionLoading = false;
        state.nodeEmissionsByRegionError = true;
      });

    /** Get electricity draw by technology type **/
    builder
      .addCase(getElectricityDrawByTechnologyTypeAction.pending, (state) => {
        state.electricityDrawByTechnologyTypeLoading = true;
        state.electricityDrawByTechnologyTypeError = false;
      })
      .addCase(
        getElectricityDrawByTechnologyTypeAction.fulfilled,
        (state, { payload }) => {
          state.electricityDrawByTechnologyTypeLoading = false;
          state.electricityDrawByTechnologyType = payload as Draft<ChartData>;
        }
      )
      .addCase(getElectricityDrawByTechnologyTypeAction.rejected, (state) => {
        state.electricityDrawByTechnologyTypeLoading = false;
        state.electricityDrawByTechnologyTypeError = true;
      });

    builder
      .addCase(getNodeStatsAction.pending, (state) => {
        state.nodeStats = null;
        state.nodeStatsLoading = true;
      })
      .addCase(
        getNodeStatsAction.fulfilled,
        (state, { payload }) => {
          state.nodeStatsLoading = false;
          state.nodeStats = payload;
        }
      )
      .addCase(getNodeStatsAction.rejected, (state) => {
        state.nodeStatsLoading = false;
      });

    builder
      .addCase(getNodeEmissionsAction.pending, (state) => {
        state.nodeEmissions = null;
        state.nodeEmissionsLoading = false;
      })
      .addCase(
        getNodeEmissionsAction.fulfilled,
        (state, { payload }) => {
          state.nodeEmissionsLoading = false;
          state.nodeEmissions = payload as Draft<ChartData>;
        }
      )
      .addCase(getNodeEmissionsAction.rejected, (state) => {
        state.nodeEmissionsLoading = false;
      });
  }
});

export {
  getNodesLeaderboardAction,
  getNodeEmissionsByRegionAction,
  getNetworkEmissionsAction,
  getElectricityDrawByTechnologyTypeAction,
  getNodeStatsAction,
  getNodeEmissionsAction
};

export default nodesSlice.reducer;
