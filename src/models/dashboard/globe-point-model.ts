export interface GlobePointModel {
  location: string;
  emissions: number;
  carbonIntensity: number;
  nodeCount: number;
  coordinates?: CoordinatesModel;
}

export interface GlobePointViewModel {
  lat: number;
  lng: number;
  size: number;
  carbonIntensity: number;
  label: string;
  nodesCount: number;
}

export interface CoordinatesModel {
  latitude: number;
  longitude: number;
}
