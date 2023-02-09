import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChartData } from 'chart.js';
import type { RangeType } from '@/models/range-type';
import type { FC } from 'react';

import useNodes from '@/helpers/state/useNodes';
import useChart from '@/helpers/useChart';
import SelectTimeRange from '@/components/SelectTimeRange';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';

const ElectricityDrawByTechnologyType: FC = () => {
  const { t } = useTranslation();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  const {
    actions: { getElectricityDrawByTechnologyType },
    electricityDrawByTechnologyType,
    isElectricityDrawByTechnologyTypeLoading
  } = useNodes();
  const [
    electricityDrawByTechnologyTypeData,
    setElectricityDrawByTechnologyTypeData
  ] = useState<ChartData>();

  useEffect(() => {
    getElectricityDrawByTechnologyType(range);
  }, [range, getElectricityDrawByTechnologyType]);

  useEffect(() => {
    if (electricityDrawByTechnologyType) {
      setElectricityDrawByTechnologyTypeData(
        structuredClone(electricityDrawByTechnologyType)
      );
    }
  }, [electricityDrawByTechnologyType]);

  return (
    <FlexColumnCard>
      <span>{t('nodes.electricityDrawByTechnologyType')}</span>
      <StyledChart
        type="line"
        data={electricityDrawByTechnologyTypeData}
        options={chartOptions}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isElectricityDrawByTechnologyTypeLoading}
      />
    </FlexColumnCard>
  );
};

export default ElectricityDrawByTechnologyType;
