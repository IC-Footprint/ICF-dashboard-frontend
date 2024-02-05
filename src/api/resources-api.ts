import type { GlobalConfigurationModel } from '@/models/global-configuration-model';

export class ResourcesApi {
  loadGlobalConfiguration(): GlobalConfigurationModel {
    return {
      links: {
        discord: 'https://discord.gg/8pt9xV5ZP8',
        openChat:
          'https://oc.app/group/pnfp5-fqaaa-aaaar-a3xsa-cai/?ref=h2vet-liaaa-aaaar-as4ja-cai&code=832fc1fed5cd7def',
        twitter: 'https://twitter.com/icfootprint',
        sustainabilityReport: 'https://assets.carboncrowd.io/reports/ICF.pdf',
        greenEnergyQuote: 'https://assets.carboncrowd.io/quotes/ICF.pdf', // TODO: Replace with actual quote
        priorCommitmentForm:
          'https://assets.carboncrowd.io/prior-commitment-form', // TODO: Replace with actual link
        scheduleCall: 'schedule-call' // TODO: Replace with actual link
      }
    };
  }
}

const resourcesApi: ResourcesApi = new ResourcesApi();
export default resourcesApi;
