import { useEffect, useState } from 'react';

import type { ChartOptions } from 'chart.js';

import useViewport from '@/helpers/useViewport';
import { ChartUtils } from '@/utils/chart-utils';

const useChart = () => {
  const [chartOptions, setChartOptions] = useState<ChartOptions>({});
  const { isMobile } = useViewport();

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
        textColorSecondary,
        isMobileViewport: isMobile
      })
    );
  }, [isMobile]); // TODO: update on theme change

  return {
    chartOptions
  };
};

export default useChart;
