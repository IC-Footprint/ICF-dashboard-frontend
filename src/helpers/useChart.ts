import { useEffect, useState } from 'react';

import type { ChartOptions } from 'chart.js';

import { ChartUtils } from '@/utils/chart-utils';

const useChart = () => {
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorderColor =
      documentStyle.getPropertyValue('--surface-border');
    setChartOptions(
      ChartUtils.buildLineChartOptions({
        surfaceBorderColor,
        textColor,
        textColorSecondary
      })
    );
  }, []); // TODO: update on theme change

  return {
    chartOptions
  };
};

export default useChart;
