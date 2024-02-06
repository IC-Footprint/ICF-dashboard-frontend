import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import CanisterAttributionsTable from '@/components/CanisterAttributionsTable';
import useNodes from '@/helpers/state/useNodes';
import { StyledCard } from '@/theme/styled-components';

interface NodeCanisterAttributionsProps {
  nodeId: string;
}

const NodeCanisterAttributions: FC<NodeCanisterAttributionsProps> = ({
  nodeId
}) => {
  const { t } = useTranslation();
  const {
    actions: { getNodeCanisterAttributions },
    canisterAttributions,
    isCanisterAttributionsLoading
  } = useNodes();

  useEffect(() => {
    if (!canisterAttributions) {
      getNodeCanisterAttributions(nodeId);
    }
  }, [nodeId, canisterAttributions, getNodeCanisterAttributions]);

  return (
    <StyledCard>
      <span>{t('nodes.nodeCanisterAttributions')}</span>
      <CanisterAttributionsTable
        list={canisterAttributions ?? []}
        isLoading={isCanisterAttributionsLoading}
      />
    </StyledCard>
  );
};

export default NodeCanisterAttributions;
