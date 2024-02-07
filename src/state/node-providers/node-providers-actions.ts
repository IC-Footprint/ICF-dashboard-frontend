import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import nodesApi from '@/api/nodes-api';

export const getNodeProviderDetailsAction = createAsyncThunk<
  HeadlineFiguresModel,
  string
>(
  '/nodeProviders/getNodeProviderDetails',
  async (providerId, { rejectWithValue }) => {
    try {
      return await nodesApi.getNodeProviderStats(providerId);
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
