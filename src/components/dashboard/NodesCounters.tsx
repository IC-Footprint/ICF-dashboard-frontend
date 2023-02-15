import { Column } from 'primereact/column';
import { useEffect } from 'react';

import type { FC } from 'react';

import useDashboard from '@/helpers/state/useDashboard';
import {
  HeadlessDashboardTable,
  TableContainerCard
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
    <TableContainerCard>
      <HeadlessDashboardTable
        value={nodesCounters ?? []}
        loading={isNodesCountersLoading}
        scrollable
        scrollHeight="flex"
      >
        <Column field="label"></Column>
        <Column field="value"></Column>
      </HeadlessDashboardTable>
    </TableContainerCard>
  );
};

export default NodesCounters;
