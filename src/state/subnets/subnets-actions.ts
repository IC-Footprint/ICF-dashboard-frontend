import { createAsyncThunk } from '@reduxjs/toolkit';

import type { DatasetModel } from '@/models/dataset-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import { ChartMapper } from '@/utils/chart-mapper';
import subnetsApi from '@/api/subnets-api';


export const getSubnetEmissionsByTypeAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/subnets/getSubnetEmissionsByType', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await subnetsApi.getEmissionsByType(
      range
    );
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getEmissionsBySubnetAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/subnets/getEmissionsBySubnet', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await subnetsApi.getEmissionsBySubnet(
      range
    );
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});
