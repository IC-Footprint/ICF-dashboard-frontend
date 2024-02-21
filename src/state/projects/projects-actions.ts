import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { ChartData } from 'chart.js';

import networkApi from '@/api/network-api';
import projectsApi from '@/api/projects-api';
import { createEmptyCarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import { DashboardMappers } from '@/state/dashboard/dashboard-mappers';
import { ProjectMappers } from '@/state/projects/project-mappers';
import { ChartMapper } from '@/utils/chart-mapper';

export const getProjectDetailsAction = createAsyncThunk<
  [HeadlineFiguresModel, CarbonAccountModel],
  string
>('projects/getProjectDetails', async (projectId, { rejectWithValue }) => {
  try {
    const projectsList = projectsApi.getProjects();
    const projectsEmissions: EmissionsModel[] =
      await projectsApi.getProjectsEmissions();
    const projectsElectricityDraw =
      await projectsApi.getProjectElectricityDraw();
    const projectDetails =
      DashboardMappers.mapProjects(
        projectsList.filter((p) => p.id === projectId),
        projectsEmissions
      ).at(0) ?? createEmptyCarbonAccountModel();
    const projectElectricityDraw = projectsElectricityDraw.find(
      (d) => d.name === projectId
    );
    const projectStats = ProjectMappers.mapProjectStats(
      projectDetails,
      projectElectricityDraw
    );
    return [projectStats, projectDetails];
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getProjectCanisterAttributionsAction = createAsyncThunk<
  CanisterAttributionModel[],
  string
>(
  'projects/getProjectCanisterAttributions',
  async (projectId, { rejectWithValue }) => {
    try {
      return await projectsApi.getProjectCanisterAttributions(projectId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectEmissionsAction = createAsyncThunk<
  ChartData,
  DatasetFilterModel
>('projects/getProjectEmissions', async (filter, { rejectWithValue }) => {
  try {
    const datasets = await networkApi.getEmissionsBySubnet(filter.range);
    const projectDataset = datasets.filter((d) => d.dataSetName === filter.id);
    return ChartMapper.mapChartData(projectDataset, filter.range);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getProjectPowerConsumptionAction = createAsyncThunk<
  ChartData,
  DatasetFilterModel
>(
  'projects/getProjectPowerConsumption',
  async (filter, { rejectWithValue }) => {
    try {
      const datasets = await projectsApi.getProjectPowerConsumption(filter);
      return ChartMapper.mapChartData(datasets, filter.range);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
