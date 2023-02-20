import type { GlobeOptionsModel } from '@/models/dashboard/globe-options-model';

export class GlobeUtils {
  static buildGlobeOptions(): GlobeOptionsModel {
    return {
      pointOfViewAltitude: 2,
      pointSizeScale: 0.002,
      pointRadius: 0.3
    };
  }
}
