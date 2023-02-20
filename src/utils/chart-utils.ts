import type { LineOptions, PointPrefixedOptions } from 'chart.js/dist/types';
import type { BuildChartOptionsModel } from '@/models/build-chart-options-model';
import type { ChartOptions, FontSpec } from 'chart.js';

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
          display: false
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
