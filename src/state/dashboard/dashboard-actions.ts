import { createAsyncThunk } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

import dashboardApi from '@/api/dashboard-api';

export const getHeadlineFiguresAction = createAsyncThunk<
  HeadlineFiguresModel,
  void
>('/getHeadlineFigures', async (_, { rejectWithValue }) => {
  try {
    return await dashboardApi.getDashboardHeadlineFigures();
  } catch (err) {
    return rejectWithValue(null);
  }
});
