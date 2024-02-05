import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type {
  LinkType,
  GlobalConfigurationModel
} from '@/models/global-configuration-model';

import { socialLogos } from '@/theme/assets/social-logos';

export class ResourcesMappers {
  static mapSocialIconLink(
    globalConfiguration: GlobalConfigurationModel | null,
    type: LinkType
  ): IconModel {
    return {
      name: type,
      icon: socialLogos[type] ?? '',
      url: globalConfiguration?.links[type] ?? ''
    };
  }
}
