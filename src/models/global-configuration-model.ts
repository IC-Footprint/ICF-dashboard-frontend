export type LinkType =
  | 'sustainabilityReport'
  | 'discord'
  | 'twitter'
  | 'openChat'
  | 'greenEnergyQuote'
  | 'priorCommitmentForm'
  | 'scheduleCall';

export interface GlobalConfigurationModel {
  links: Record<LinkType, string>;
}
