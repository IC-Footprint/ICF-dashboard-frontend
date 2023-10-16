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

interface NodeEmissionsProps {
  nodeId: string
}

const NodeEmissions: FC<NodeEmissionsProps> = ({ nodeId }) => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const { chartOptions } = useChart();
  const [range, setRange] = useState<RangeType>('ONE_DAY');
  const {
    actions: { getNodeEmissions },
    nodeEmissions,
    nodeEmissionsLoading
  } = useNodes();
  
  const [nodeEmissionsData, setNodeEmissionsData] =
    useState<ChartData>();

  useEffect(() => {
    getNodeEmissions(nodeId, range);
  }, [range, getNodeEmissions, nodeId]);

  useEffect(() => {
    if (nodeEmissions) {
      setNodeEmissionsData(structuredClone(nodeEmissions));
    }
  }, [nodeEmissions]);

  return (
    <FlexColumnCard>
      <span>{t('nodes.nodeEmissions')}</span>
      <StyledChart
        type="line"
        data={nodeEmissionsData}
        options={chartOptions}
        $isMobile={isMobile}
      />
      <SelectTimeRange
        range={range}
        setRange={setRange}
        disabled={nodeEmissionsLoading}
      />
    </FlexColumnCard>
  );
};

export default NodeEmissions;
