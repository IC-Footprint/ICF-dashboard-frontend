import axios from 'axios';

import type { ProjectModel } from '@/models/dashboard/project-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { ElectricityDrawModel } from '@/models/electricity-draw-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { AxiosResponse } from 'axios';

import icLogo from '@/theme/assets/ic-logo.png';
import openChatIcon from '@/theme/assets/social-logos/openchat.png';

export class ProjectsApi {
  // TODO: use real list
  getProjects(): ProjectModel[] {
    return [
      {
        id: ['tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe'],
        name: 'NNS',
        icon: icLogo
      },
      {
        id: ['eq6en-6jqla-fbu5s-daskr-h6hx2-376n5-iqabl-qgrng-gfqmv-n3yjr-mqe', '2fq7c-slacv-26cgz-vzbx2-2jrcs-5edph-i5s2j-tck77-c3rlz-iobzx-mqe'],
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
