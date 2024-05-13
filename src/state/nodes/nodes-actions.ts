import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';

import paymentApi from '@/api/payment-api';
import { NodesMappers } from '@/state/nodes/nodes-mappers';
import { ChartMapper } from '@/utils/chart-mapper';
import locationMapper from '@/utils/location-mapper';
import i18n from '@/i18n';
import nodesApi from '@/api/nodes-api';

export const getNodesListAction = createAsyncThunk<CarbonAccountModel[], void>(
  '/nodes/getNodesList',
  async (_, { rejectWithValue }) => {
    try {
      const nodesList = await nodesApi.getNodesList();
      const nodesEmissions = await nodesApi.getNodesEmissions();
      return nodesList
        .map(NodesMappers.mapNodeAccounts(nodesEmissions))
        .sort((a, b) => b.carbonDebit - a.carbonDebit);
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
  DatasetFilterModel
>('/node/emissionsAndElectricity', async (filter, { rejectWithValue }) => {
  try {
    const datasets = await nodesApi.getNodeEmissions(filter);
    return ChartMapper.mapChartData(datasets, filter.range);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNodeDetailsAction = createAsyncThunk<
  CarbonAccountModel,
  string
>('/node/nodeDetails', async (nodeId, { rejectWithValue }) => {
  try {
    const nodesList = await nodesApi.getNodesList();
    const details = nodesList.find((n) => n.id === nodeId);
    const nodesEmissions = await nodesApi.getNodesEmissions();
    return NodesMappers.mapNodeAccounts(nodesEmissions)(details);
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const getNodeCanisterAttributionsAction = createAsyncThunk<
  CanisterAttributionModel[],
  string
>('/node/nodeCanisterAttributions', async (nodeId, { rejectWithValue }) => {
  try {
    const payments = await paymentApi.getPurchases(nodeId);
    const reversedPurchases = payments.reverse();
    return await reversedPurchases;
  } catch (err) {
    return rejectWithValue(null);
  }
});

