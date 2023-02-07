import { createAsyncThunk } from '@reduxjs/toolkit';

import type { DatasetModel } from '@/models/dataset-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import { ChartMapper } from '@/utils/chart-mapper';
import nodesApi from '@/api/nodes-api';

export const getNodesLeaderboardAction = createAsyncThunk<NodeModel[], void>(
  '/getNodesLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      return await nodesApi.getNodesLeaderboard();
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getNetworkEmissionsAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/getNetworkEmissions', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await nodesApi.getNetworkEmissions(range);
    return ChartMapper.mapChartData(datasets);
  } catch (err) {
    return rejectWithValue(null);
  }
});
