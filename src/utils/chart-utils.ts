import type { BuildChartOptionsModel } from '@/models/build-chart-options-model';
import type { ChartOptions, FontSpec } from 'chart.js';

export class ChartUtils {
  private static defaultFont(): Partial<FontSpec> {
    return {
      family: 'Inter',
      size: 11,
      weight: '400'
    };
  }

  static buildLineChartOptions(
    options: BuildChartOptionsModel
  ): ChartOptions<'line'> {
    return {
      responsive: true,
      datasets: {
        line: {
          tension: 0.4
        }
      },
      aspectRatio: 5,
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
