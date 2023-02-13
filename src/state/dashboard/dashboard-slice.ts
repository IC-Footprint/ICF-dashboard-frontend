import { createSlice } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { NodesCounterViewModel } from '@/models/dashboard/nodes-counters-model';

import {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
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
}

const initialState: () => DashboardState = () => ({
  headlineFigures: null,
  headlineFiguresError: false,
  headlineFiguresLoading: false,
  locationsLeaderboard: null,
  locationsLeaderboardError: false,
  locationsLeaderboardLoading: false,
  nodesCounters: null,
  nodesCountersError: false,
  nodesCountersLoading: false
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
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
  }
});

export {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodesCountersAction
};

export default dashboardSlice.reducer;
