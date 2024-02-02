import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { addDays, addMinutes, addMonths, addYears } from 'date-fns';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useChart from '@/helpers/useChart';
import useViewport from '@/helpers/useViewport';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';
import IcApi from '@/api/ic-api';

interface NodePowerConsumtionProps {
  nodeId: string;
}

const NodePowerConsumption: FC<NodePowerConsumtionProps> = ({ nodeId }) => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('SEVEN_DAYS');
  const [loading, setLoading] = useState(false);

  const [nodeEmissionsData, setNodeEmissionsData] = useState<ChartData>();

  console.log(setNodeEmissionsData);

  const currentTimestamp = useMemo(() => {
    return new Date();
  }, []);

  const icClient = useMemo(() => {
    return new IcApi();
  }, []);

  const endDate = useMemo(() => {
    switch (range) {
      case 'FIVE_YEARS':
        return addYears(currentTimestamp, -5);
      case 'ONE_YEAR':
        return addYears(currentTimestamp, -1);
      case 'THREE_MONTHS':
        return addMonths(currentTimestamp, -3);
      case 'ONE_MONTH':
        return addMonths(currentTimestamp, -1);
      case 'SEVEN_DAYS':
        return addDays(currentTimestamp, -7);
      case 'ONE_DAY':
        return addDays(currentTimestamp, -1);
      case 'HALF_AN_HOUR':
        return addMinutes(currentTimestamp, -30);
    }
  }, [range, currentTimestamp]);

  const granularity = useMemo(() => {
    switch (range) {
      case 'SEVEN_DAYS':
        return 60 * 60;
      case 'ONE_MONTH':
        return 60 * 60 * 24;
    }

    return 250000;
  }, [range]);

  useEffect(() => {
    if (!icClient) return;

    setLoading(true);

    icClient
      .getNodeEnergyConsumptionRate(
        nodeId,
        endDate.getTime() / 1000,
        currentTimestamp.getTime() / 1000,
        granularity
      )
      .then((readings) => {
        const chartData: ChartData = {
          datasets: [
            {
              data: readings.energy_consumption_rate.map(
                ([timestamp, reading]) => {
                  return { x: parseInt(timestamp), y: parseFloat(reading) };
                }
              )
            }
          ],
          labels: readings.energy_consumption_rate.map(([timestamp]) =>
            new Date(parseInt(timestamp) * 1000).toLocaleDateString()
          )
        };

        setNodeEmissionsData(chartData);
      })
      .finally(() => setLoading(false));
  }, [endDate, currentTimestamp, icClient, range, granularity, nodeId]);

  console.log(nodeEmissionsData);

  return (
    <FlexColumnCard>
      <span>{t('nodes.nodeElectricityDraw')}</span>
      <StyledChart
        type="line"
        data={nodeEmissionsData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange range={range} setRange={setRange} disabled={loading} />
    </FlexColumnCard>
  );
};

export default NodePowerConsumption;
