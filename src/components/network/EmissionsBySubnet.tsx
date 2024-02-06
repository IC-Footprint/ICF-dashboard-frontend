import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useChart from '@/helpers/useChart';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';
import useNetwork from '@/helpers/state/useNetwork';
import useViewport from '@/helpers/useViewport';

const NetworkEmissions: FC = () => {
  const { t } = useTranslation();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  const { isMobile } = useViewport();

  const {
    actions: { getEmissionsBySubnet },
    emissionsBySubnet,
    isEmissionsBySubnetLoading
  } = useNetwork();

  const [emissionsBySubnetData, setEmissionsBySubnetData] =
    useState<ChartData>();

  useEffect(() => {
    getEmissionsBySubnet(range);
  }, [range, getEmissionsBySubnet]);

  useEffect(() => {
    if (emissionsBySubnet) {
      setEmissionsBySubnetData(structuredClone(emissionsBySubnet));
    }
  }, [emissionsBySubnet]);

  return (
    <FlexColumnCard>
      <span>{t('network.emissionsBySubnet')}</span>
      <StyledChart
        type="line"
        data={emissionsBySubnetData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isEmissionsBySubnetLoading}
      />
    </FlexColumnCard>
  );
};

export default NetworkEmissions;
