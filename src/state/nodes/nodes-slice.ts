import { createSlice } from '@reduxjs/toolkit';

import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChartData } from 'chart.js';
import type { Draft } from 'immer';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import {
  getElectricityDrawByTechnologyTypeAction,
  getNetworkEmissionsAction,
  getNodeEmissionsByRegionAction,
  getNodeEmissionsByProviderAction,
  getNodesListAction,
  getNodeStatsAction,
  getNodeEmissionsAction
} from '@/state/nodes/nodes-actions';

export interface NodesState {
  nodesList: CarbonAccountModel[] | null;
  nodesListLoading: boolean;
  nodesListError: boolean;
  networkEmissions: ChartData | null;
  networkEmissionsLoading: boolean;
  networkEmissionsError: boolean;
  nodeEmissionsByRegion: ChartData | null;
  nodeEmissionsByProvider: ChartData | null;
  nodeEmissionsByRegionLoading: boolean;
  nodeEmissionsByProviderLoading: boolean;
  nodeEmissionsByRegionError: boolean;
  nodeEmissionsByProviderError: boolean;
  electricityDrawByTechnologyType: ChartData | null;
  electricityDrawByTechnologyTypeLoading: boolean;
  electricityDrawByTechnologyTypeError: boolean;
  nodeStats: HeadlineFiguresModel | null;
  nodeStatsLoading: boolean;
  nodeEmissions: ChartData | null;
  nodeEmissionsLoading: boolean;
}

const initialState: () => NodesState = () => ({
  nodesListLoading: false,
  nodesListError: false,
  nodesList: null,
  electricityDrawByTechnologyType: null,
  electricityDrawByTechnologyTypeLoading: false,
  electricityDrawByTechnologyTypeError: false,
  networkEmissions: null,
  networkEmissionsLoading: false,
  networkEmissionsError: false,
  nodeEmissionsByRegion: null,
  nodeEmissionsByProvider: null,
  nodeEmissionsByRegionLoading: false,
  nodeEmissionsByProviderLoading: false,
  nodeEmissionsByRegionError: false,
  nodeEmissionsByProviderError: false,
  nodeStats: null,
  nodeStatsLoading: false,
  nodeEmissions: null,
  nodeEmissionsLoading: false
});

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    resetNodesListAction: (state) => {
      state.nodesListLoading = false;
      state.nodesListError = false;
      state.nodesList = null;
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
      .addCase(getNodesListAction.pending, (state) => {
        state.nodesListLoading = true;
        state.nodesListError = false;
      })
      .addCase(getNodesListAction.fulfilled, (state, { payload }) => {
        state.nodesListLoading = false;
        state.nodesList = payload;
      })
      .addCase(getNodesListAction.rejected, (state) => {
        state.nodesListLoading = false;
        state.nodesListError = true;
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

    builder
      .addCase(getNodeEmissionsByProviderAction.pending, (state) => {
        state.nodeEmissionsByProviderLoading = true;
        state.nodeEmissionsByProviderError = false;
      })
      .addCase(
        getNodeEmissionsByProviderAction.fulfilled,
        (state, { payload }) => {
          state.nodeEmissionsByProvider = payload as Draft<ChartData>;
          state.nodeEmissionsByProviderLoading = false;
        }
      )
      .addCase(getNodeEmissionsByProviderAction.rejected, (state) => {
        state.nodeEmissionsByProviderLoading = false;
        state.nodeEmissionsByProviderError = true;
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
      .addCase(getNodeStatsAction.fulfilled, (state, { payload }) => {
        state.nodeStatsLoading = false;
        state.nodeStats = payload;
      })
      .addCase(getNodeStatsAction.rejected, (state) => {
        state.nodeStatsLoading = false;
      });

    builder
      .addCase(getNodeEmissionsAction.pending, (state) => {
        state.nodeEmissions = null;
        state.nodeEmissionsLoading = false;
      })
      .addCase(getNodeEmissionsAction.fulfilled, (state, { payload }) => {
        state.nodeEmissionsLoading = false;
        state.nodeEmissions = payload as Draft<ChartData>;
      })
      .addCase(getNodeEmissionsAction.rejected, (state) => {
        state.nodeEmissionsLoading = false;
      });
  }
});

export {
  getNodesListAction,
  getNodeEmissionsByRegionAction,
  getNodeEmissionsByProviderAction,
  getNetworkEmissionsAction,
  getElectricityDrawByTechnologyTypeAction,
  getNodeStatsAction,
  getNodeEmissionsAction
};

export default nodesSlice.reducer;
