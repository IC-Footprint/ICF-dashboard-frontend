export type LinkType =
  | 'sustainabilityReport'
  | 'discord'
  | 'twitter'
  | 'openChat';

export interface GlobalConfigurationModel {
  links: Record<LinkType, string>;
}
