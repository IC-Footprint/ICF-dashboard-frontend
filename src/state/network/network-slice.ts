import { createSlice } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChartData } from 'chart.js';
import type { Draft } from 'immer';

import { NetworkMappers } from '@/state/network/network-mappers';
import {
  getSubnetEmissionsByTypeAction,
  getEmissionsBySubnetAction,
  getNetworkDetailsAction,
  getNetworkAttributionsAction
} from '@/state/network/network-actions';

export interface NetworkState {
  subnetEmissionsByType: ChartData | null;
  subnetEmissionsByTypeLoading: boolean;
  subnetEmissionsByTypeError: boolean;
  emissionsBySubnet: ChartData | null;
  emissionsBySubnetLoading: boolean;
  emissionsBySubnetError: boolean;
  networkDetails: CarbonAccountModel | null;
  networkStats: HeadlineFiguresModel | null;
  networkDetailsLoading: boolean;
  networkDetailsError: boolean;
  networkAttributions: CanisterAttributionModel[] | null;
  networkAttributionsLoading: boolean;
  networkAttributionsError: boolean;
}

const initialState: () => NetworkState = () => ({
  subnetEmissionsByType: null,
  subnetEmissionsByTypeLoading: false,
  subnetEmissionsByTypeError: false,
  emissionsBySubnet: null,
  emissionsBySubnetLoading: false,
  emissionsBySubnetError: false,
  networkDetails: null,
  networkStats: null,
  networkDetailsLoading: false,
  networkDetailsError: false,
  networkAttributions: null,
  networkAttributionsLoading: false,
  networkAttributionsError: false
});

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NetworkState>) => {
    builder
      .addCase(getSubnetEmissionsByTypeAction.pending, (state) => {
        state.subnetEmissionsByTypeLoading = true;
        state.subnetEmissionsByTypeError = false;
      })
      .addCase(
        getSubnetEmissionsByTypeAction.fulfilled,
        (state, { payload }) => {
          state.subnetEmissionsByTypeLoading = false;
          state.subnetEmissionsByType = payload as Draft<ChartData>;
        }
      )
      .addCase(getSubnetEmissionsByTypeAction.rejected, (state) => {
        state.subnetEmissionsByTypeLoading = false;
        state.subnetEmissionsByTypeError = true;
      });

    builder
      .addCase(getEmissionsBySubnetAction.pending, (state) => {
        state.emissionsBySubnetLoading = true;
        state.emissionsBySubnetError = false;
      })
      .addCase(getEmissionsBySubnetAction.fulfilled, (state, { payload }) => {
        state.emissionsBySubnetLoading = false;
        state.emissionsBySubnet = payload as Draft<ChartData>;
      })
      .addCase(getEmissionsBySubnetAction.rejected, (state) => {
        state.emissionsBySubnetLoading = false;
        state.emissionsBySubnetError = true;
      });

    builder
      .addCase(getNetworkDetailsAction.pending, (state) => {
        state.networkDetailsLoading = true;
        state.networkDetailsError = false;
      })
      .addCase(getNetworkDetailsAction.fulfilled, (state, { payload }) => {
        state.networkDetailsLoading = false;
        state.networkStats = payload;
        state.networkDetails = NetworkMappers.mapNetworkStatsToAccount(payload);
      })
      .addCase(getNetworkDetailsAction.rejected, (state) => {
        state.networkDetailsLoading = false;
        state.networkDetailsError = true;
      });

    builder
      .addCase(getNetworkAttributionsAction.pending, (state) => {
        state.networkAttributionsLoading = true;
        state.networkAttributionsError = false;
      })
      .addCase(getNetworkAttributionsAction.fulfilled, (state, { payload }) => {
        state.networkAttributionsLoading = false;
        state.networkAttributions = payload;
      })
      .addCase(getNetworkAttributionsAction.rejected, (state) => {
        state.networkAttributionsLoading = false;
        state.networkAttributionsError = true;
      });
  }
});

export {
  getSubnetEmissionsByTypeAction,
  getEmissionsBySubnetAction,
  getNetworkDetailsAction,
  getNetworkAttributionsAction
};

export default networkSlice.reducer;
