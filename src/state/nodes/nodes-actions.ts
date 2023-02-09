import { createAsyncThunk } from '@reduxjs/toolkit';

import type { DatasetModel } from '@/models/dataset-model';
import type { NodeModel } from '@/models/nodes/node-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import i18n from '@/i18n';
import nodesApi from '@/api/nodes-api';
import { ChartMapper } from '@/utils/chart-mapper';
import locationMapper from '@/utils/location-mapper';

export const getNodesLeaderboardAction = createAsyncThunk<NodeModel[], void>(
  '/getNodesLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const leaderboard = await nodesApi.getNodesLeaderboard();
      return leaderboard.map((node: NodeModel) => ({
        ...node,
        location: locationMapper.mapLocationName(node.location)
      }));
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
    const datasetsWithMappedNames: DatasetModel[] = datasets.map(
      (d: DatasetModel) => ({
        ...d,
        dataSetName: i18n.t(`datasets.${d.dataSetName}`)
      })
    );
    return ChartMapper.mapChartData(datasetsWithMappedNames, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNodeEmissionsByRegionAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/getNodeEmissionsByRegion', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await nodesApi.getNodeEmissionsByRegion(
      range
    );
    const datasetsWithMappedLocationNames: DatasetModel[] = datasets.map(
      (d: DatasetModel) => ({
        ...d,
        dataSetName: locationMapper.mapLocationName(d.dataSetName)
      })
    );
    return ChartMapper.mapChartData(datasetsWithMappedLocationNames, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getElectricityDrawByTechnologyTypeAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/getElectricityDrawByTechnologyType', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] =
      await nodesApi.getElectricityDrawByTechnologyType(range);
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});
