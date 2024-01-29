import { default as discord } from './discord-logo.png';
import { default as openChat } from './open-chat-logo.png';
import { default as twitter } from './twitter-logo.png';

import type { LinkType } from '@/models/global-configuration-model';

export const socialLogos: Partial<Record<LinkType, string>> = {
  twitter,
  discord,
  openChat
};
