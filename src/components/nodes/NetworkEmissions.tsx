import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useNodes from '@/helpers/state/useNodes';
import useChart from '@/helpers/useChart';
import { ChartContainer } from '@/theme/styled-components';

const NetworkEmissions: FC = () => {
  const { t } = useTranslation();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  const {
    actions: { getNetworkEmissions },
    networkEmissions,
    isNetworkEmissionsLoading
  } = useNodes();
  const [networkEmissionsData, setNetworkEmissionsData] = useState<ChartData>();

  useEffect(() => {
    getNetworkEmissions(range);
  }, [range, getNetworkEmissions]);

  useEffect(() => {
    if (networkEmissions) {
      setNetworkEmissionsData(structuredClone(networkEmissions));
    }
  }, [networkEmissions]);

  return (
    <ChartContainer>
      <span>{t('nodes.networkEmissions')}</span>
      <Chart type="line" data={networkEmissionsData} options={chartOptions} />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isNetworkEmissionsLoading}
      />
    </ChartContainer>
  );
};

export default NetworkEmissions;
