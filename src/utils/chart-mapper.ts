import type { DatasetModel } from '@/models/dataset-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData, ChartDataset } from 'chart.js';

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
  private static mapDateLabel(
    dateString: string,
    range: RangeType | null
  ): string {
    const date: Date = new Date(dateString);
    if (range === 'HALF_AN_HOUR' || range === 'ONE_DAY') {
      return date.toLocaleTimeString();
    }
    return date.toLocaleDateString();
  }

  static mapChartData(
    datasets: DatasetModel[],
    range: RangeType | null
  ): ChartData {
    const mappedDatasets: ChartDataset[] = datasets.map(
      (dataset: DatasetModel, index: number) => {
        return {
          label: dataset.dataSetName,
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
              ChartMapper.mapDateLabel(label, range)
            )
          : [],
      datasets: mappedDatasets
    };
  }
}
