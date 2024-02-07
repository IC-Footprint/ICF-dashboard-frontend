import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import { ModelMocks } from '@/mocks/model.mocks';

export class ProjectsApi {
  // TODO: integrate
  async getProjectStats(_projectId: string): Promise<HeadlineFiguresModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockHeadlineFigures());
      }, 1000);
    });
  }

  // TODO: integrate
  async getProjectCanisterAttributions(
    _projectId: string
  ): Promise<CanisterAttributionModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockCanisterAttributions());
      }, 1000);
    });
  }

  // TODO: integrate
  async getProjectEmissions(
    _filter: DatasetFilterModel
  ): Promise<DatasetModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockDatasetList());
      }, 1000);
    });
  }

  // TODO: integrate
  async getProjectPowerConsumption(
    _filter: DatasetFilterModel
  ): Promise<DatasetModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ModelMocks.mockDatasetList());
      }, 1000);
    });
  }
}

const projectsApi = new ProjectsApi();
export default projectsApi;
