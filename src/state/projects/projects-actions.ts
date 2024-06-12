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
import paymentApi from '@/api/payment-api';

export const getProjectDetailsAction = createAsyncThunk<
  [HeadlineFiguresModel, CarbonAccountModel],
  string
>('projects/getProjectDetails', async (projectId, { rejectWithValue }) => {
  try {
    const projectsList = await projectsApi.getProjects();
    console.log('projectsList:', projectsList);
    const projectsEmissions: EmissionsModel[] =
      await projectsApi.getProjectsEmissions();
    console.log('projectsEmissions:', projectsEmissions);
    const projectsElectricityDraw =
      await projectsApi.getProjectElectricityDraw();
    console.log('projectsElectricityDraw:', projectsElectricityDraw);
    
    // Split the projectId by comma to get an array of project IDs
    const projectIds = projectId.split(',');
    console.log('projectIds:', projectIds);
    
    const projectDetails =
      (
        await DashboardMappers.mapProjects(
          projectsList.filter((p) => projectIds.some((id) => p.id.includes(id))),
          projectsEmissions
        )
      ).at(0) ?? createEmptyCarbonAccountModel();
    console.log('projectDetails:', projectDetails);
    const projectElectricityDraw = projectsElectricityDraw.find(
      (d) => d.name === projectId
    );
    console.log('projectElectricityDraw:', projectElectricityDraw);
    const projectStats = ProjectMappers.mapProjectStats(
      projectDetails,
      projectElectricityDraw
    );
    console.log('projectStats:', projectStats);
    return [projectStats, projectDetails];
  } catch (error) {
    console.error('Error in getProjectDetailsAction:', error);
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
      // console.log(projectId);
      // split project id if there's a comma
      const projectIds = projectId.split(',');
      console.log('projectIds:', projectIds);
      // pass first project id to get purchases for that project
      const payments = await paymentApi.getPurchases(projectIds[0]);
      console.log('payments:', payments);
      const reversedPayments = payments.reverse();
      console.log('reversedPayments:', reversedPayments);
      return reversedPayments;
    } catch (error) {
      console.error('Error in getProjectCanisterAttributionsAction:', error);
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
    console.log('datasets:', datasets);
    const projectDataset = datasets.filter((d) => d.dataSetName === filter.id);
    console.log('projectDataset:', projectDataset);
    return ChartMapper.mapChartData(projectDataset, filter.range);
  } catch (error) {
    console.error('Error in getProjectEmissionsAction:', error);
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
      console.log('datasets:', datasets);
      return ChartMapper.mapChartData(datasets, filter.range);
    } catch (error) {
      console.error('Error in getProjectPowerConsumptionAction:', error);
      return rejectWithValue(error);
    }
  }
);
