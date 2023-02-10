import { createSlice } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';

import {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction
} from '@/state/dashboard/dashboard-actions';
export interface DashboardState {
  headlineFigures: HeadlineFiguresModel | null;
  headlineFiguresLoading: boolean;
  headlineFiguresError: boolean;
  locationsLeaderboard: LocationEmissionsModel[] | null;
  locationsLeaderboardLoading: boolean;
  locationsLeaderboardError: boolean;
}

const initialState: () => DashboardState = () => ({
  headlineFigures: null,
  headlineFiguresError: false,
  headlineFiguresLoading: false,
  locationsLeaderboard: null,
  locationsLeaderboardError: false,
  locationsLeaderboardLoading: false
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
  }
});

export { getHeadlineFiguresAction, getLocationsLeaderboardAction };

export default dashboardSlice.reducer;
