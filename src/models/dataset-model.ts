export interface DatasetModel {
  dataSetName: string;
  labels: string[];
  data: (number | null)[];
  active?: boolean;
}
