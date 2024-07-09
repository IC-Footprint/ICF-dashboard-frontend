import axios from 'axios';

import type { ProjectModel } from '@/models/dashboard/project-model';
import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { DatasetModel } from '@/models/dataset-model';
import type { ElectricityDrawModel } from '@/models/electricity-draw-model';
import type { EmissionsModel } from '@/models/emissions-model';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { AxiosResponse } from 'axios';

import { createActor as nodeManagerCreateActor } from '@/declarations/node_manager';

import icLogo from '@/theme/assets/ic-logo.png';
import openChatIcon from '@/theme/assets/social-logos/openchat.png';

export class ProjectsApi {
  // TODO: use real list
  async getProjects(): Promise<ProjectModel[]> {
    console.log('Fetching projects from Node Manager canister...');
    const nodeManagerActor = nodeManagerCreateActor(
      process.env.CANISTER_ID_NODE_MANAGER ?? '',
      {
        agentOptions: {
          host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
        }
      }
    );
    // console.log('Node Manager actor created:', nodeManagerActor);

    // console.log('Calling get_projects() on Node Manager actor...');
    const result = await nodeManagerActor.get_projects();
    // console.log('Projects fetched from Node Manager:', result);

    // Hardcoded projects
    const hardcodedProjects: ProjectModel[] = [
      {
        id: ['tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe'],
        name: 'NNS',
        icon: icLogo
      },
      {
        id: [
          'eq6en-6jqla-fbu5s-daskr-h6hx2-376n5-iqabl-qgrng-gfqmv-n3yjr-mqe',
          '2fq7c-slacv-26cgz-vzbx2-2jrcs-5edph-i5s2j-tck77-c3rlz-iobzx-mqe'
        ],
        name: 'OpenChat',
        icon: openChatIcon
      }
    ];

    // Combine hardcoded projects with fetched projects
    const fetchedProjects = result.map(
      (project: { id: any; name: any; icon: any }) => ({
        id: project.id,
        name: project.name,
        icon: project.icon || icLogo // Use icLogo as fallback if no icon is provided
      })
    );

    return [...hardcodedProjects, ...fetchedProjects];
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
