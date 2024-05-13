import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import { ChartMapper } from '@/utils/chart-mapper';
import networkApi from '@/api/network-api';
import dashboardApi from '@/api/dashboard-api';
import paymentApi from '@/api/payment-api';

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
  CanisterAttributionModel[],
  void
>('/network/getNetworkAttributions', async (_, { rejectWithValue }) => {
  try {
    const allPurchases: CanisterAttributionModel[] = await paymentApi.getAllPurchases();
    const reversedPurchases = allPurchases.reverse();
    return reversedPurchases;
  } catch (err) {
    return rejectWithValue(null);
  }
});
