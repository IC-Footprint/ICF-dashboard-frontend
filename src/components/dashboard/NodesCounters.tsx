import { Column } from 'primereact/column';
import { useEffect } from 'react';

import type { FC } from 'react';

import useDashboard from '@/helpers/state/useDashboard';
import {
  FlexColumnCard,
  HeadlessDashboardTable
} from '@/theme/styled-components';

const NodesCounters: FC = () => {
  const {
    actions: { getNodesCounters },
    nodesCounters,
    isNodesCountersLoading
  } = useDashboard();

  useEffect(() => {
    getNodesCounters();
  }, [getNodesCounters]);

  return (
    <FlexColumnCard>
      <HeadlessDashboardTable
        value={nodesCounters ?? []}
        loading={isNodesCountersLoading}
      >
        <Column field="label"></Column>
        <Column field="value"></Column>
      </HeadlessDashboardTable>
    </FlexColumnCard>
  );
};

export default NodesCounters;
