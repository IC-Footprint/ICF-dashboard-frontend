import type { ChartData, ChartDataset } from 'chart.js';
import type { DatasetModel } from '@/models/dataset-model';

const seriesPalette: string[] = [
  '#14B8A6',
  '#eab308',
  '#a855f7',
  '#06b6d4',
  '#f97316',
  '#20bf6b',
  '#a5b1c2',
  '#eb3b5a',
  '#45aaf2',
  '#a55eea',
  '#778ca3'
];

export class ChartMapper {
  static mapChartData(datasets: DatasetModel[]): ChartData {
    const mappedDatasets: ChartDataset[] = datasets.map(
      (dataset: DatasetModel, index: number) => {
        return {
          data: dataset.data,
          backgroundColor: seriesPalette[index % seriesPalette.length],
          borderColor: seriesPalette[index % seriesPalette.length]
        };
      }
    );
    return {
      labels:
        datasets.length > 0
          ? datasets[0].labels.map((label: string) =>
              new Date(label).toLocaleDateString()
            )
          : [],
      datasets: mappedDatasets
    };
  }
}
