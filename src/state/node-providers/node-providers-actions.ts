import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import nodeProvidersApi from '@/api/node-providers-api';
import nodesApi from '@/api/nodes-api';

export const getNodeProviderDetailsAction = createAsyncThunk<
  HeadlineFiguresModel,
  string
>(
  '/nodeProviders/getNodeProviderDetails',
  async (providerId, { rejectWithValue }) => {
    try {
      const nodeProvidersList = await nodeProvidersApi.getNodeProviders();
      const nodeProvider = nodeProvidersList
        .filter((provider) => provider.name === providerId)
        .at(0);
      const nodeProvidersElectricityDrawList =
        await nodeProvidersApi.getNodeProvidersElectricityDraw();
      const nodeProviderElectricityDraw = nodeProvidersElectricityDrawList
        .filter((provider) => provider.name === providerId)
        .at(0);
      return {
        avoidedEmissions: 0,
        cumulativeElectricityDraw:
          nodeProviderElectricityDraw?.totalElectricityDraw ?? 0,
        cumulativeNetworkEmissions: nodeProvider?.totalEmissions ?? 0,
        cumulativeNetworkEmissionsRate: 0,
        offsetEmissions: 0,
        weeklyEmissions: nodeProvider?.weeklyEmissions ?? 0
      };
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getNodeProviderCanisterAttributionAction = createAsyncThunk<
  CanisterAttributionModel[],
  string
>(
  '/nodeProviders/getNodeProviderCanisterAttributions',
  async (providerId, { rejectWithValue }) => {
    try {
      return await nodesApi.getNodeProviderCanisterAttributions(providerId);
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);
