import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { NodesCounterViewModel } from '@/models/dashboard/nodes-counters-model';
import type { DataLayoutType } from '@/models/dashboard/data-layout-type';

import {
  getGlobePointsAction,
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodeProvidersAction,
  getNodesCountersAction,
  getProjectsAction
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
  nodeProviders: CarbonAccountModel[] | null;
  nodeProvidersLoading: boolean;
  nodeProvidersError: boolean;
  projects: CarbonAccountModel[] | null;
  projectsLoading: boolean;
  projectsError: boolean;
  dataLayout: DataLayoutType;
  searchFilter: string;
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
  nodeProviders: null,
  nodeProvidersError: false,
  nodeProvidersLoading: false,
  projects: null,
  projectsError: false,
  projectsLoading: false,
  dataLayout: 'grid',
  searchFilter: ''
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDataLayout: (state, { payload }: PayloadAction<DataLayoutType>) => {
      state.dataLayout = payload;
    },
    setSearchFilter: (state, { payload }: PayloadAction<string>) => {
      state.searchFilter = payload;
    },
    resetHeadlineFigures: (state) => {
      state.headlineFigures = null;
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

    /** Get node providers **/
    builder
      .addCase(getNodeProvidersAction.pending, (state) => {
        state.nodeProvidersLoading = true;
        state.nodeProvidersError = false;
      })
      .addCase(getNodeProvidersAction.fulfilled, (state, { payload }) => {
        state.nodeProvidersLoading = false;
        state.nodeProviders = payload;
      })
      .addCase(getNodeProvidersAction.rejected, (state) => {
        state.nodeProvidersLoading = false;
        state.nodeProvidersError = true;
      });

    /** Get projects **/
    builder
      .addCase(getProjectsAction.pending, (state) => {
        state.projectsLoading = true;
        state.projectsError = false;
      })
      .addCase(getProjectsAction.fulfilled, (state, { payload }) => {
        state.projectsLoading = false;
        state.projects = payload;
      })
      .addCase(getProjectsAction.rejected, (state) => {
        state.projectsLoading = false;
        state.projectsError = true;
      });
  }
});

export const {
  setDataLayout: setDataLayoutAction,
  setSearchFilter: setSearchFilterAction,
  resetHeadlineFigures: resetHeadlineFiguresAction
} = dashboardSlice.actions;

export {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodesCountersAction,
  getGlobePointsAction,
  getNodeProvidersAction,
  getProjectsAction
};

export default dashboardSlice.reducer;
