import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import SelectTimeRange from '@/components/SelectTimeRange';
import useNodes from '@/helpers/state/useNodes';
import useChart from '@/helpers/useChart';
import useViewport from '@/helpers/useViewport';
import { FlexColumnCard, StyledChart } from '@/theme/styled-components';

const NodeEmissionsByRegion: FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('SEVEN_DAYS');
  const {
    actions: { getNodeEmissionsByRegion },
    nodeEmissionsByRegion,
    isNodeEmissionsByRegionLoading
  } = useNodes();
  const [nodeEmissionsByRegionData, setNodeEmissionsByRegionData] =
    useState<ChartData>();

  useEffect(() => {
    getNodeEmissionsByRegion(range);
  }, [range, getNodeEmissionsByRegion]);

  useEffect(() => {
    if (nodeEmissionsByRegion) {
      setNodeEmissionsByRegionData(structuredClone(nodeEmissionsByRegion));
    }
  }, [nodeEmissionsByRegion]);

  return (
    <FlexColumnCard>
      <span>{t('nodes.nodeEmissionsByRegion')}</span>
      <StyledChart
        type="line"
        data={nodeEmissionsByRegionData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isNodeEmissionsByRegionLoading}
      />
    </FlexColumnCard>
  );
};

export default NodeEmissionsByRegion;
