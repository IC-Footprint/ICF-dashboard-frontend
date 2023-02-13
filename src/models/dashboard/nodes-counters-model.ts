export interface NodesCountersModel {
  dataCentres: number;
  subnets: number;
  boundaryNodes: number;
  nodeInSubnets: number;
  totalNodes: number;
}

export interface NodesCounterViewModel {
  label: string;
  value: number;
}
