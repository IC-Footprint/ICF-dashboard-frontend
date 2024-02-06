import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionViewModel } from '@/models/nodes/canister-attribution-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import dashboardApi from '@/api/dashboard-api';
import networkApi from '@/api/network-api';
import { NodesMappers } from '@/state/nodes/nodes-mappers';
import { ChartMapper } from '@/utils/chart-mapper';

export const getSubnetEmissionsByTypeAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/network/getSubnetEmissionsByType', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await networkApi.getEmissionsByType(range);
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getEmissionsBySubnetAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/network/getEmissionsBySubnet', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await networkApi.getEmissionsBySubnet(
      range
    );
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNetworkDetailsAction = createAsyncThunk<
  HeadlineFiguresModel,
  void
>('/network/getHeadlineFigures', async (_, { rejectWithValue }) => {
  try {
    return await dashboardApi.getDashboardHeadlineFigures();
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNetworkAttributionsAction = createAsyncThunk<
  CanisterAttributionViewModel[],
  void
>('/network/getNetworkAttributions', async (_, { rejectWithValue }) => {
  try {
    const attributions = await networkApi.getNetworkAttributions();
    return attributions.map(NodesMappers.mapCanisterAttribution);
  } catch (err) {
    return rejectWithValue(null);
  }
});
