import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { NodesCounterViewModel } from '@/models/dashboard/nodes-counters-model';
import type { OutstandingCarbonDebitModel } from '@/models/dashboard/outstanding-carbon-debit-model';
import type { DataLayoutType } from '@/models/dashboard/data-layout-type';

import {
  getDashboardCarbonDebitAction,
  getGlobePointsAction,
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodeOperatorsAction,
  getNodesCountersAction
} from '@/state/dashboard/dashboard-actions';

export interface DashboardState {
  headlineFigures: HeadlineFiguresModel | null;
  headlineFiguresLoading: boolean;
  headlineFiguresError: boolean;
  locationsLeaderboard: LocationEmissionsModel[] | null;
  locationsLeaderboardLoading: boolean;
  locationsLeaderboardError: boolean;
  nodesCounters: NodesCounterViewModel[] | null;
  nodesCountersLoading: boolean;
  nodesCountersError: boolean;
  globePoints: GlobePointModel[] | null;
  globePointsLoading: boolean;
  globePointsError: boolean;
  carbonDebit: OutstandingCarbonDebitModel | null;
  carbonDebitLoading: boolean;
  carbonDebitError: boolean;
  nodeOperators: CarbonAccountModel[] | null;
  nodeOperatorsLoading: boolean;
  nodeOperatorsError: boolean;
  dataLayout: DataLayoutType;
}

export const initialState: () => DashboardState = () => ({
  headlineFigures: null,
  headlineFiguresError: false,
  headlineFiguresLoading: false,
  locationsLeaderboard: null,
  locationsLeaderboardError: false,
  locationsLeaderboardLoading: false,
  nodesCounters: null,
  nodesCountersError: false,
  nodesCountersLoading: false,
  globePoints: null,
  globePointsError: false,
  globePointsLoading: false,
  carbonDebit: null,
  carbonDebitLoading: false,
  carbonDebitError: false,
  nodeOperators: null,
  nodeOperatorsError: false,
  nodeOperatorsLoading: false,
  dataLayout: 'grid'
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDataLayout: (state, { payload }: PayloadAction<DataLayoutType>) => {
      state.dataLayout = payload;
    }
  },
  extraReducers: (builder) => {
    /** Get headline figures **/
    builder
      .addCase(getHeadlineFiguresAction.pending, (state) => {
        state.headlineFiguresLoading = true;
        state.headlineFiguresError = false;
      })
      .addCase(getHeadlineFiguresAction.fulfilled, (state, { payload }) => {
        state.headlineFiguresLoading = false;
        state.headlineFigures = payload;
      })
      .addCase(getHeadlineFiguresAction.rejected, (state) => {
        state.headlineFiguresLoading = false;
        state.headlineFiguresError = true;
      });

    /** Get locations leaderboard **/
    builder
      .addCase(getLocationsLeaderboardAction.pending, (state) => {
        state.locationsLeaderboardLoading = true;
        state.locationsLeaderboardError = false;
      })
      .addCase(
        getLocationsLeaderboardAction.fulfilled,
        (state, { payload }) => {
          state.locationsLeaderboardLoading = false;
          state.locationsLeaderboard = payload;
        }
      )
      .addCase(getLocationsLeaderboardAction.rejected, (state) => {
        state.locationsLeaderboardLoading = false;
        state.locationsLeaderboardError = true;
      });

    /** Get nodes counters **/
    builder
      .addCase(getNodesCountersAction.pending, (state) => {
        state.nodesCountersLoading = true;
        state.nodesCountersError = false;
      })
      .addCase(getNodesCountersAction.fulfilled, (state, { payload }) => {
        state.nodesCountersLoading = false;
        state.nodesCounters = payload;
      })
      .addCase(getNodesCountersAction.rejected, (state) => {
        state.nodesCountersLoading = false;
        state.nodesCountersError = true;
      });

    /** Get globe points **/
    builder
      .addCase(getGlobePointsAction.pending, (state) => {
        state.globePointsLoading = true;
        state.globePointsError = false;
      })
      .addCase(getGlobePointsAction.fulfilled, (state, { payload }) => {
        state.globePointsLoading = false;
        state.globePoints = payload;
      })
      .addCase(getGlobePointsAction.rejected, (state) => {
        state.globePointsLoading = false;
        state.globePointsError = true;
      });

    /** Get dashboard carbon debit **/
    builder
      .addCase(getDashboardCarbonDebitAction.pending, (state) => {
        state.carbonDebitLoading = true;
        state.carbonDebitError = false;
      })
      .addCase(
        getDashboardCarbonDebitAction.fulfilled,
        (state, { payload }) => {
          state.carbonDebitLoading = false;
          state.carbonDebit = payload;
        }
      )
      .addCase(getDashboardCarbonDebitAction.rejected, (state) => {
        state.carbonDebitLoading = false;
        state.carbonDebitError = true;
      });

    /** Get node operators **/
    builder
      .addCase(getNodeOperatorsAction.pending, (state) => {
        state.nodeOperatorsLoading = true;
        state.nodeOperatorsError = false;
      })
      .addCase(getNodeOperatorsAction.fulfilled, (state, { payload }) => {
        state.nodeOperatorsLoading = false;
        state.nodeOperators = payload;
      })
      .addCase(getNodeOperatorsAction.rejected, (state) => {
        state.nodeOperatorsLoading = false;
        state.nodeOperatorsError = true;
      });
  }
});

export const { setDataLayout: setDataLayoutAction } = dashboardSlice.actions;

export {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodesCountersAction,
  getGlobePointsAction,
  getDashboardCarbonDebitAction,
  getNodeOperatorsAction
};

export default dashboardSlice.reducer;
