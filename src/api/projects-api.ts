import axios from 'axios';

import type { ProjectModel } from '@/models/dashboard/project-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { ElectricityDrawModel } from '@/models/electricity-draw-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { AxiosResponse } from 'axios';

import openChatIcon from '@/theme/assets/social-logos/open-chat-logo.png';

export class ProjectsApi {
  // TODO: use real list
  getProjects(): ProjectModel[] {
    return [
      {
        id: 'eq6en-6jqla-fbu5s-daskr-h6hx2-376n5-iqabl-qgrng-gfqmv-n3yjr-mqe',
        name: 'OpenChat',
        icon: openChatIcon
      }
    ];
  }

  async getProjectsEmissions(): Promise<EmissionsModel[]> {
    const emissions: AxiosResponse<EmissionsModel[]> = await axios.get(
      '/d-apps/getDAppEmissions'
    );
    return emissions.data;
  }

  async getProjectElectricityDraw(): Promise<ElectricityDrawModel[]> {
    const response: AxiosResponse<ElectricityDrawModel[]> = await axios.get(
      '/d-apps/getDAppElectricityDraws'
    );
    return response.data;
  }

  // TODO: integrate
  async getProjectCanisterAttributions(
    _projectId: string
  ): Promise<CanisterAttributionModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }

  // TODO: integrate
  async getProjectPowerConsumption(
    _filter: DatasetFilterModel
  ): Promise<DatasetModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }
}

const projectsApi = new ProjectsApi();
export default projectsApi;
