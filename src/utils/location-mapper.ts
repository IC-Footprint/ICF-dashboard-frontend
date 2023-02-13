import type { LocationModel } from '@/models/location-model';

import i18n from '@/i18n';

export class LocationMapper {
  private readonly locations: LocationModel[];

  constructor() {
    this.locations = this.buildLocations();
  }

  private buildLocations(): LocationModel[] {
    return [
      this.createLocation('BE'),
      this.createLocation('CH'),
      this.createLocation('DE'),
      this.createLocation('FR'),
      this.createLocation('JP'),
      this.createLocation('RO'),
      this.createLocation('SG'),
      this.createLocation('SI'),
      this.createLocation('US')
    ];
  }

  private createLocation(code: string): LocationModel {
    return {
      code,
      name: i18n.t(`locations.${code.toLowerCase()}`)
    };
  }

  private getLocation(locationCode: string): LocationModel {
    return (
      this.locations.find(
        (location: LocationModel) => location.code === locationCode
      ) ?? this.createLocation(locationCode)
    );
  }

  mapLocationName(location: string): string {
    const splitLocation: string[] = location.split('/');
    if (splitLocation.length === 2) {
      return `${this.getLocation(splitLocation[0]).name} (${splitLocation[1]})`;
    }
    return this.getLocation(location).name;
  }
}

const locationMapper: LocationMapper = new LocationMapper();
export default locationMapper;
