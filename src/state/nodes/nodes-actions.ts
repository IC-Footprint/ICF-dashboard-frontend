import { createAsyncThunk } from '@reduxjs/toolkit';

import type { DatasetModel } from '@/models/dataset-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import i18n from '@/i18n';
import nodesApi from '@/api/nodes-api';
import { ChartMapper } from '@/utils/chart-mapper';
import locationMapper from '@/utils/location-mapper';
import { NodesMappers } from '@/state/nodes/nodes-mappers';

export const getNodesListAction = createAsyncThunk<CarbonAccountModel[], void>(
  '/nodes/getNodesList',
  async (_, { rejectWithValue }) => {
    try {
      const list = await nodesApi.getNodesList();
      return NodesMappers.mapNodeAccounts(list);
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getNetworkEmissionsAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/nodes/getNetworkEmissions', async (range, { rejectWithValue }) => {
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
>('/nodes/getNodeEmissionsByRegion', async (range, { rejectWithValue }) => {
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

export const getNodeEmissionsByProviderAction = createAsyncThunk<
  ChartData,
  RangeType | null
>('/nodes/getNodeEmissionsByProvider', async (range, { rejectWithValue }) => {
  try {
    const datasets: DatasetModel[] = await nodesApi.getNodeEmissionsByProvider(
      range
    );
    return ChartMapper.mapChartData(datasets, range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getElectricityDrawByTechnologyTypeAction = createAsyncThunk<
  ChartData,
  RangeType | null
>(
  '/nodes/getElectricityDrawByTechnologyType',
  async (range, { rejectWithValue }) => {
    try {
      const datasets: DatasetModel[] =
        await nodesApi.getElectricityDrawByTechnologyType(range);
      return ChartMapper.mapChartData(datasets, range);
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getNodeStatsAction = createAsyncThunk<
  HeadlineFiguresModel,
  string
>('/node/nodeStats', async (nodeId, { rejectWithValue }) => {
  try {
    return await nodesApi.getNodeStats(nodeId);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNodeEmissionsAction = createAsyncThunk<
  ChartData,
  { range: RangeType | null; nodeId: string }
>(
  '/node/emissionsAndElectricity',
  async ({ range, nodeId }, { rejectWithValue }) => {
    try {
      const datasets = await nodesApi.getNodeEmissions(nodeId, range);
      return ChartMapper.mapChartData(datasets, range);
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);
