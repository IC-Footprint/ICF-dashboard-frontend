import { createSlice } from '@reduxjs/toolkit';

import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';

import { getHeadlineFiguresAction } from '@/state/dashboard/dashboard-actions';

export interface DashboardState {
  headlineFigures: HeadlineFiguresModel | null;
  headlineFiguresLoading: boolean;
  headlineFiguresError: boolean;
}

const initialState: () => DashboardState = () => ({
  headlineFigures: null,
  headlineFiguresError: false,
  headlineFiguresLoading: false
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Get headline figures **/
    builder
      .addCase(getHeadlineFiguresAction.pending, (state) => {
        state.headlineFiguresLoading = true;
        state.headlineFiguresError = false;
      })
      .addCase(getHeadlineFiguresAction.fulfilled, (state, { payload }) => {
        state.headlineFiguresLoading = false;
        state.headlineFigures = payload;
      })
      .addCase(getHeadlineFiguresAction.rejected, (state) => {
        state.headlineFiguresLoading = false;
        state.headlineFiguresError = true;
      });
  }
});

export { getHeadlineFiguresAction };

export default dashboardSlice.reducer;
