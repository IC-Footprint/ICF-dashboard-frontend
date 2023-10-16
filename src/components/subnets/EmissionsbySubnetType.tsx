import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useChart from '@/helpers/useChart';
import useViewport from '@/helpers/useViewport';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';
import useSubnets from '@/helpers/state/useSubnets';

const NodeEmissionsByRegion: FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  
  const {
    actions: { getSubnetEmissionsByType },
    subnetEmissionsByType,
    isSubnetEmissionsByTypeLoading
  } = useSubnets();
  
  const [emissionsByTypeData, setEmissionsByTypeData] =
    useState<ChartData>();

  useEffect(() => {
    getSubnetEmissionsByType(range);
  }, [range, getSubnetEmissionsByType]);

  useEffect(() => {
    if (subnetEmissionsByType) {
      setEmissionsByTypeData(structuredClone(subnetEmissionsByType));
    }
  }, [subnetEmissionsByType]);

  return (
    <FlexColumnCard>
      <span>{t('subnets.subnetEmissionsByType')}</span>
      <StyledChart
        type="line"
        data={emissionsByTypeData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isSubnetEmissionsByTypeLoading}
      />
    </FlexColumnCard>
  );
};

export default NodeEmissionsByRegion;
