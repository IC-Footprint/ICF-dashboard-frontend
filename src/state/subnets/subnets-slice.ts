import { createSlice } from '@reduxjs/toolkit';

import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { ChartData } from 'chart.js';
import type { Draft } from 'immer';

import { getSubnetEmissionsByTypeAction, getEmissionsBySubnetAction } from '@/state/subnets/subnets-actions';

export interface SubnetsState {
  subnetEmissionsByType: ChartData | null;
  subnetEmissionsByTypeLoading: boolean;
  subnetEmissionsByTypeError: boolean;
  emissionsBySubnet: ChartData | null;
  emissionsBySubnetLoading: boolean;
  emissionsBySubnetError: boolean;
}

const initialState: () => SubnetsState = () => ({
  subnetEmissionsByType: null,
  subnetEmissionsByTypeLoading: false,
  subnetEmissionsByTypeError: false,
  emissionsBySubnet: null,
  emissionsBySubnetLoading: false,
  emissionsBySubnetError: false
});

const subnetsSlice = createSlice({
    name: 'subnets',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<SubnetsState>) => {
        builder
            .addCase(getSubnetEmissionsByTypeAction.pending, (state) => {
                state.subnetEmissionsByTypeLoading = true;
                state.subnetEmissionsByTypeError = false;
            })
            .addCase(getSubnetEmissionsByTypeAction.fulfilled, (state, { payload }) => {
                state.subnetEmissionsByTypeLoading = false;
                state.subnetEmissionsByType = payload as Draft<ChartData>;
            })
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
    },
});

export {
  getSubnetEmissionsByTypeAction,
  getEmissionsBySubnetAction
};

export default subnetsSlice.reducer;
