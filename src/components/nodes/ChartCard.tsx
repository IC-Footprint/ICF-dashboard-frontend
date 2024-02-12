import { useEffect, useState, useMemo } from 'react';

import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useChart from '@/helpers/useChart';
import useViewport from '@/helpers/useViewport';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';

interface ChartCardProps {
  idFilter: string;
  data: ChartData | null;
  getDataAction?: (filter: DatasetFilterModel) => void;
  isLoading?: boolean;
  label: string;
}

const ChartCard: FC<ChartCardProps> = ({
  idFilter,
  getDataAction,
  isLoading,
  data,
  label
}) => {
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  const chartData = useMemo(() => {
    return data ? structuredClone(data) : null;
  }, [data]);

  useEffect(() => {
    if (idFilter && getDataAction) {
      getDataAction({
        id: idFilter,
        range
      });
    }
  }, [range, idFilter, getDataAction]);

  return (
    <FlexColumnCard>
      <span>{label}</span>
      <StyledChart
        type="line"
        data={chartData ?? undefined}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange range={range} setRange={setRange} disabled={isLoading} />
    </FlexColumnCard>
  );
};

export default ChartCard;
