export type LinkType =
  | 'sustainabilityReport'
  | 'discord'
  | 'twitter'
  | 'openChat'
  | 'greenEnergyQuote'
  | 'priorCommitmentForm'
  | 'scheduleCall'
  | 'internetComputerDashboard';

export interface GlobalConfigurationModel {
  links: Record<LinkType, string>;
}
