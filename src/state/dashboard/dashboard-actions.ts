import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';
import type { NodesCounterViewModel } from '@/models/dashboard/nodes-counters-model';
import type { GlobePointModel } from '@/models/dashboard/globe-point-model';

import { DashboardMappers } from '@/state/dashboard/dashboard-mappers';
import dashboardApi from '@/api/dashboard-api';
import locationMapper from '@/utils/location-mapper';

export const getHeadlineFiguresAction = createAsyncThunk<
  HeadlineFiguresModel,
  void
>('/dashboard/getHeadlineFigures', async (_, { rejectWithValue }) => {
  try {
    return await dashboardApi.getDashboardHeadlineFigures();
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
