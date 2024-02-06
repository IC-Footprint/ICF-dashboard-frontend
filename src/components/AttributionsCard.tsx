import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { FC } from 'react';

import CanisterAttributionsTable from '@/components/CanisterAttributionsTable';
import { StyledCard } from '@/theme/styled-components';

interface NodeCanisterAttributionsProps {
  list: CanisterAttributionModel[];
  isLoading?: boolean;
  title: string;
}

const AttributionsCard: FC<NodeCanisterAttributionsProps> = ({
  list,
  isLoading,
  title
}) => {
  return (
    <StyledCard>
      <span>{title}</span>
      <CanisterAttributionsTable list={list} isLoading={isLoading} />
    </StyledCard>
  );
};

export default AttributionsCard;
