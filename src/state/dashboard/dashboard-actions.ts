import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { NodesCounterViewModel } from '@/models/dashboard/nodes-counters-model';
import type { ProjectModel } from '@/models/dashboard/project-model';
import type { EmissionsModel } from '@/models/emissions-model';

import projectsApi from '@/api/projects-api';
import nodeProvidersApi from '@/api/node-providers-api';
import dashboardApi from '@/api/dashboard-api';
import { DashboardMappers } from '@/state/dashboard/dashboard-mappers';
import locationMapper from '@/utils/location-mapper';

export const getHeadlineFiguresAction = createAsyncThunk<
  HeadlineFiguresModel,
  void
>('/dashboard/getHeadlineFigures', async (_, { rejectWithValue }) => {
  try {
    const headlineFigures = await dashboardApi.getDashboardHeadlineFigures();
    const totalPercentChangeOverLastWeek =
      await dashboardApi.getTotalPercentChangeOverLastWeek();
    return {
      ...headlineFigures,
      weeklyEmissions: totalPercentChangeOverLastWeek.value
    };
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getLocationsLeaderboardAction = createAsyncThunk<
  LocationEmissionsModel[],
  void
>('/dashboard/getLocationsLeaderboard', async (_, { rejectWithValue }) => {
  try {
    const locationsLeaderboard: LocationEmissionsModel[] =
      await dashboardApi.getLocationsLeaderboard();
    return locationsLeaderboard.map(
      (locationEmissions: LocationEmissionsModel) => ({
        ...locationEmissions,
        location: locationMapper.mapLocationName(locationEmissions.location)
      })
    );
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNodesCountersAction = createAsyncThunk<
  NodesCounterViewModel[],
  void
>('/dashboard/getNodesCounters', async (_, { rejectWithValue }) => {
  try {
    const nodesCounters = await dashboardApi.getNodesCounters();
    return DashboardMappers.mapDashboardNodesCounters(nodesCounters);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getGlobePointsAction = createAsyncThunk<GlobePointModel[], void>(
  '/dashboard/getGlobePoints',
  async (_, { rejectWithValue }) => {
    try {
      const globePoints: GlobePointModel[] =
        await dashboardApi.getGlobePoints();
      return globePoints.map((point: GlobePointModel) => ({
        ...point,
        location: locationMapper.mapLocationName(point.location)
      }));
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getNodeProvidersAction = createAsyncThunk<
  CarbonAccountModel[],
  void
>('/dashboard/getNodeProviders', async (_, { rejectWithValue }) => {
  try {
    const nodeProviders: EmissionsModel[] =
      await nodeProvidersApi.getNodeProviders();
    return DashboardMappers.mapNodeProviders(nodeProviders);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getProjectsAction = createAsyncThunk<CarbonAccountModel[], void>(
  '/dashboard/getProjects',
  async (_, { rejectWithValue }) => {
    try {
      const projects: ProjectModel[] = projectsApi.getProjects();
      const projectsEmissions: EmissionsModel[] =
        await projectsApi.getProjectsEmissions();

        // console.log(projectsEmissions);
      return DashboardMappers.mapProjects(projects, projectsEmissions);
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);
