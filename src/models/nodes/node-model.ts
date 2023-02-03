export interface NodeModel {
  id: string;
  nodeProvider: string;
  electricityDrawn: number;
  carbonIntensity: number;
  emissions: number;
  location: string;
  status: string;
  dataCentreOwner: string;
  subnetId: string;
  gridMix: string[];
}
