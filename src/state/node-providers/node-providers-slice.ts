import { createSlice } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import {
  getNodeProviderDetailsAction,
  getNodeProviderCanisterAttributionAction
} from '@/state/node-providers/node-providers-actions';
import { NodeProvidersMappers } from '@/state/node-providers/node-providers-mappers';

export interface NodeProvidersState {
  nodeProvider: CarbonAccountModel | null;
  nodeProviderStats: HeadlineFiguresModel | null;
  nodeProviderLoading: boolean;
  nodeProviderError: boolean;
  nodeProviderCanisterAttributions: CanisterAttributionModel[] | null;
  nodeProviderCanisterAttributionsLoading: boolean;
  nodeProviderCanisterAttributionsError: boolean;
}

const initialState: () => NodeProvidersState = () => ({
  nodeProviderLoading: false,
  nodeProviderError: false,
  nodeProvider: null,
  nodeProviderStats: null,
  nodeProviderCanisterAttributions: null,
  nodeProviderCanisterAttributionsLoading: false,
  nodeProviderCanisterAttributionsError: false
});

export const nodeProvidersSlice = createSlice({
  name: 'nodeProviders',
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNodeProviderDetailsAction.pending, (state) => {
        state.nodeProviderLoading = true;
        state.nodeProviderError = false;
      })
      .addCase(getNodeProviderDetailsAction.fulfilled, (state, action) => {
        state.nodeProviderLoading = false;
        state.nodeProviderStats = action.payload;
        state.nodeProvider = NodeProvidersMappers.mapStatsToAccount(
          action.payload,
          action.meta.arg
        );
      })
      .addCase(getNodeProviderDetailsAction.rejected, (state) => {
        state.nodeProviderLoading = false;
        state.nodeProviderError = true;
      });

    builder
      .addCase(getNodeProviderCanisterAttributionAction.pending, (state) => {
        state.nodeProviderCanisterAttributionsLoading = true;
        state.nodeProviderCanisterAttributionsError = false;
      })
      .addCase(
        getNodeProviderCanisterAttributionAction.fulfilled,
        (state, action) => {
          state.nodeProviderCanisterAttributionsLoading = false;
          state.nodeProviderCanisterAttributions = action.payload;
        }
      )
      .addCase(getNodeProviderCanisterAttributionAction.rejected, (state) => {
        state.nodeProviderCanisterAttributionsLoading = false;
        state.nodeProviderCanisterAttributionsError = true;
      });
  }
});

export {
  getNodeProviderDetailsAction,
  getNodeProviderCanisterAttributionAction
};

export default nodeProvidersSlice.reducer;
