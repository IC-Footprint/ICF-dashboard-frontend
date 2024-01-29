import { createAsyncThunk } from '@reduxjs/toolkit';

import type { GlobalConfigurationModel } from '@/models/global-configuration-model';

import resourcesApi from '@/api/resources-api';

export const loadGlobalConfigurationAction = createAsyncThunk<
  GlobalConfigurationModel,
  void
>('/resources/loadGlobalConfiguration', async (_, { rejectWithValue }) => {
  try {
    return resourcesApi.loadGlobalConfiguration();
  } catch (err) {
    return rejectWithValue(null);
  }
});
