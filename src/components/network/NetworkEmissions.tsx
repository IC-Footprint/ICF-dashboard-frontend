import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useNodes from '@/helpers/state/useNodes';
import useChart from '@/helpers/useChart';
import { FlexColumnCard } from '@/theme/styled-components';

const NetworkEmissions: FC = () => {
  const { t } = useTranslation();
  const { chartOptions } = useChart(false);
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
    <FlexColumnCard>
      <span>{t('nodes.networkEmissions')}</span>
      <Chart type="line" data={networkEmissionsData} options={chartOptions} />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isNetworkEmissionsLoading}
      />
    </FlexColumnCard>
  );
};

export default NetworkEmissions;
