import type { GlobeOptionsModel } from '@/models/dashboard/globe-options-model';

export class GlobeUtils {
  static buildGlobeOptions(): GlobeOptionsModel {
    return {
      pointOfViewAltitude: 1.5,
      pointSizeScale: 0.002,
      pointRadius: 0.3
    };
  }
}
