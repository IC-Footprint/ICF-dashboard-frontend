import { Chart } from 'primereact/chart';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addDays, format } from 'date-fns';

import SelectTimeRange from '../SelectTimeRange';

import type { ChartData } from 'chart.js';
import type { FC } from 'react';
import type { RangeType } from '@/models/range-type';

import useChart from '@/helpers/useChart';
import { FlexColumnCard } from '@/theme/styled-components';
import CarbonRankingsApi from '@/api/carbon-rankings-api';

const CryptoEmissionsChart: FC = () => {
  const { t } = useTranslation();
  const { chartOptions } = useChart();

  const [emissionsdata, setEmissionsData] = useState<ChartData>();
  const [range, setRange] = useState<RangeType>('ONE_MONTH');
  const [loading, setLoading] = useState(false);

  const client = useMemo(() => {
    return new CarbonRankingsApi();
  }, []);

  const daysCount = useMemo(() => {
    switch (range) {
      case 'FIVE_YEARS':
        return 5 * 365;
      case 'ONE_YEAR':
        return 365;
      case 'THREE_MONTHS':
        return 3 * 31;
      case 'ONE_MONTH':
        return 31;
      case 'SEVEN_DAYS':
        return 7;
      case 'ONE_DAY':
        return 1;
    }

    return 0;
  }, [range]);

  const labels = useMemo(() => {
    const newLabels: string[] = [];
    const currentDate = new Date();

    for (let i = daysCount; i > 0; i--) {
      newLabels.push(format(addDays(currentDate, -i), 'yyyy-MM-dd'));
    }

    return newLabels;
  }, [daysCount]);

  useEffect(() => {
    setLoading(true);

    client
      .getEmissionsGraphData()
      .then((response) => {
        const chartData: ChartData = {
          datasets: response.map((dataset) => {
            return {
              label: dataset.name,
              data: labels.map((date) => dataset.emissions[date])
            };
          }),
          labels
        };

        setEmissionsData(chartData);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [client, labels]);

  return (
    <FlexColumnCard>
      <span>{t('crypto.networkEmissions')}</span>
      <Chart
        type="line"
        data={emissionsdata}
        options={chartOptions}
        style={{ height: 350 }}
      />
      <SelectTimeRange range={range} setRange={setRange} disabled={loading} />
    </FlexColumnCard>
  );
};

export default CryptoEmissionsChart;
