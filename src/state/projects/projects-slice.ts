import { createSlice } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { ChartData } from 'chart.js';
import type { Draft } from 'immer';

import { createEmptyHeadlineFiguresModel, type HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import {
  getProjectDetailsAction,
  getProjectCanisterAttributionsAction,
  getProjectEmissionsAction,
  getProjectPowerConsumptionAction,
} from '@/state/projects/projects-actions';

export interface ProjectsState {
  project: CarbonAccountModel | null;
  projectStats: HeadlineFiguresModel | null;
  projectLoading: boolean;
  projectError: boolean;
  projectCanisterAttributions: CanisterAttributionModel[] | null;
  projectCanisterAttributionsLoading: boolean;
  projectCanisterAttributionsError: boolean;
  projectEmissions: ChartData | null;
  projectEmissionsLoading: boolean;
  projectEmissionsError: boolean;
  projectPowerConsumption: ChartData | null;
  projectPowerConsumptionLoading: boolean;
  projectPowerConsumptionError: boolean;
}

const initialState: () => ProjectsState = () => ({
  projectLoading: false,
  projectError: false,
  project: null,
  projectStats: null,
  projectCanisterAttributions: null,
  projectCanisterAttributionsLoading: false,
  projectCanisterAttributionsError: false,
  projectEmissions: null,
  projectEmissionsLoading: false,
  projectEmissionsError: false,
  projectPowerConsumption: null,
  projectPowerConsumptionLoading: false,
  projectPowerConsumptionError: false
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectDetailsAction.pending, (state) => {
        state.projectLoading = true;
        state.projectError = false;
      })
      .addCase(getProjectDetailsAction.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectStats = action.payload[0];
        state.project = action.payload[1];
      })
      .addCase(getProjectDetailsAction.rejected, (state) => {
        state.projectLoading = false;
        state.projectError = true;
      });

    builder
      .addCase(getProjectCanisterAttributionsAction.pending, (state) => {
        state.projectCanisterAttributionsLoading = true;
        state.projectCanisterAttributionsError = false;
      })
      .addCase(
        getProjectCanisterAttributionsAction.fulfilled,
        (state, action) => {
          state.projectCanisterAttributionsLoading = false;
          state.projectCanisterAttributions = action.payload;
          state.projectStats = {
            ...(state.projectStats ?? createEmptyHeadlineFiguresModel()),
            offsetEmissions: action.payload.reduce(
              (previousValue, currentValue) =>
                previousValue + (currentValue.ticketCount ?? 0),
              0
            )
          };
        }
      )
      .addCase(getProjectCanisterAttributionsAction.rejected, (state) => {
        state.projectCanisterAttributionsLoading = false;
        state.projectCanisterAttributionsError = true;
      });

    builder
      .addCase(getProjectEmissionsAction.pending, (state) => {
        state.projectEmissionsLoading = true;
        state.projectEmissionsError = false;
      })
      .addCase(getProjectEmissionsAction.fulfilled, (state, action) => {
        state.projectEmissionsLoading = false;
        state.projectEmissions = action.payload as Draft<ChartData>;
      })
      .addCase(getProjectEmissionsAction.rejected, (state) => {
        state.projectEmissionsLoading = false;
        state.projectEmissionsError = true;
      });

    builder
      .addCase(getProjectPowerConsumptionAction.pending, (state) => {
        state.projectPowerConsumptionLoading = true;
        state.projectPowerConsumptionError = false;
      })
      .addCase(getProjectPowerConsumptionAction.fulfilled, (state, action) => {
        state.projectPowerConsumptionLoading = false;
        state.projectPowerConsumption = action.payload as Draft<ChartData>;
      })
      .addCase(getProjectPowerConsumptionAction.rejected, (state) => {
        state.projectPowerConsumptionLoading = false;
        state.projectPowerConsumptionError = true;
      });
  }
});

export {
  getProjectDetailsAction,
  getProjectCanisterAttributionsAction,
  getProjectEmissionsAction,
  getProjectPowerConsumptionAction
};

export default projectsSlice.reducer;
