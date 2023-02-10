import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';

import locationMapper from '@/utils/location-mapper';
import dashboardApi from '@/api/dashboard-api';

export const getHeadlineFiguresAction = createAsyncThunk<
  HeadlineFiguresModel,
  void
>('/getHeadlineFigures', async (_, { rejectWithValue }) => {
  try {
    return await dashboardApi.getDashboardHeadlineFigures();
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getLocationsLeaderboardAction = createAsyncThunk<
  LocationEmissionsModel[],
  void
>('/getLocationsLeaderboard', async (_, { rejectWithValue }) => {
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
