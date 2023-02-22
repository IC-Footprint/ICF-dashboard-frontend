import type {
  ChartEvent,
  Color,
  LegendElement,
  LegendItem,
  LineOptions,
  PointPrefixedOptions
} from 'chart.js/dist/types';
import type { BuildChartOptionsModel } from '@/models/build-chart-options-model';
import type { ChartDataset, ChartOptions, FontSpec } from 'chart.js';

type ChartLineOptions = LineOptions & PointPrefixedOptions;

export class ChartUtils {
  private static defaultFont(): Partial<FontSpec> {
    return {
      family: 'Inter',
      size: 11,
      weight: '400'
    };
  }

  private static defaultLineOptions(): Partial<ChartLineOptions> {
    return {
      tension: 0.4
    };
  }

  private static lineOptions(
    isMobileViewport: boolean
  ): Partial<ChartLineOptions> {
    const options = ChartUtils.defaultLineOptions();
    if (isMobileViewport) {
      options.borderWidth = 1.5;
      options.pointRadius = 1.5;
    }
    return options;
  }

  private static toggleDatasetColorOpacity(
    dataset: ChartDataset<'line'>,
    colorKey: 'borderColor' | 'backgroundColor',
    opacity: boolean
  ): void {
    const color: Color | undefined = dataset[colorKey] as Color | undefined;
    if (!!color && typeof color === 'string') {
      if (opacity) {
        dataset[colorKey] = color?.length === 9 ? color.slice(0, -2) : color;
      } else {
        dataset[colorKey] = color.length === 9 ? color : color + '4D';
      }
    }
  }

  private static handleHover(
    _evt: ChartEvent,
    item: LegendItem,
    legend: LegendElement<'line'>
  ) {
    legend.chart?.data?.datasets.forEach((dataset, index) => {
      if (index !== item.datasetIndex) {
        ChartUtils.toggleDatasetColorOpacity(dataset, 'borderColor', false);
        ChartUtils.toggleDatasetColorOpacity(dataset, 'backgroundColor', false);
      }
    });
    legend.chart.update();
  }

  private static handleLeave(
    _evt: ChartEvent,
    _item: LegendItem,
    legend: LegendElement<'line'>
  ) {
    legend.chart?.data?.datasets.forEach((dataset) => {
      ChartUtils.toggleDatasetColorOpacity(dataset, 'borderColor', true);
      ChartUtils.toggleDatasetColorOpacity(dataset, 'backgroundColor', true);
    });
    legend.chart.update();
  }

  static buildLineChartOptions(
    options: BuildChartOptionsModel
  ): ChartOptions<'line'> {
    return {
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      spanGaps: true,
      datasets: {
        line: ChartUtils.lineOptions(options.isMobileViewport)
      },
      plugins: {
        tooltip: {
          mode: 'index',
          bodyFont: ChartUtils.defaultFont(),
          titleFont: ChartUtils.defaultFont()
        },
        legend: {
          display: options.displayLegend,
          position: 'bottom',
          onHover: ChartUtils.handleHover,
          onLeave: ChartUtils.handleLeave,
          labels: {
            boxWidth: 10,
            boxHeight: 10
          },
          align: 'start'
        },
        title: {
          font: ChartUtils.defaultFont()
        }
      },
      font: ChartUtils.defaultFont(),
      scales: {
        x: {
          ticks: {
            color: options.textColorSecondary,
            font: ChartUtils.defaultFont()
          },
          grid: {
            color: options.surfaceBorderColor
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: options.textColorSecondary,
            font: ChartUtils.defaultFont()
          },
          grid: {
            color: options.surfaceBorderColor
          }
        }
      }
    };
  }
}
