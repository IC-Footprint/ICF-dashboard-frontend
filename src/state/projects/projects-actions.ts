import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { ChartData } from 'chart.js';

import { ChartMapper } from '@/utils/chart-mapper';
import projectsApi from '@/api/projects-api';

export const getProjectDetailsAction = createAsyncThunk<
  HeadlineFiguresModel,
  string
>('projects/getProjectDetails', async (projectId, { rejectWithValue }) => {
  try {
    return await projectsApi.getProjectStats(projectId);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getProjectCanisterAttributionsAction = createAsyncThunk<
  CanisterAttributionModel[],
  string
>(
  'projects/getProjectCanisterAttributions',
  async (projectId, { rejectWithValue }) => {
    try {
      return await projectsApi.getProjectCanisterAttributions(projectId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectEmissionsAction = createAsyncThunk<
  ChartData,
  DatasetFilterModel
>('projects/getProjectEmissions', async (filter, { rejectWithValue }) => {
  try {
    const datasets = await projectsApi.getProjectEmissions(filter);
    return ChartMapper.mapChartData(datasets, filter.range);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getProjectPowerConsumptionAction = createAsyncThunk<
  ChartData,
  DatasetFilterModel
>(
  'projects/getProjectPowerConsumption',
  async (filter, { rejectWithValue }) => {
    try {
      const datasets = await projectsApi.getProjectPowerConsumption(filter);
      return ChartMapper.mapChartData(datasets, filter.range);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
