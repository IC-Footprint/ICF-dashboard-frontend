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

const NodeEmissionsByProvider: FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('SEVEN_DAYS');
  const {
    actions: { getNodeEmissionsByProvider },
    nodeEmissionsByProvider,
    isNodeEmissionsByProviderLoading
  } = useNodes();

  const [nodeEmissionsByProviderData, setNodeEmissionsByProviderData] =
    useState<ChartData>();

  useEffect(() => {
    getNodeEmissionsByProvider(range);
  }, [range, getNodeEmissionsByProvider]);

  useEffect(() => {
    if (nodeEmissionsByProvider) {
      setNodeEmissionsByProviderData(structuredClone(nodeEmissionsByProvider));
    }
  }, [nodeEmissionsByProvider]);

  return (
    <FlexColumnCard>
      <span>{t('nodes.nodeEmissionsByProvider')}</span>
      <StyledChart
        type="line"
        data={nodeEmissionsByProviderData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={isNodeEmissionsByProviderLoading}
      />
    </FlexColumnCard>
  );
};

export default NodeEmissionsByProvider;
