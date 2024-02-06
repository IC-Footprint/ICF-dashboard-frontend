import { t } from 'i18next';

import type { NodeStatusType } from '@/models/nodes/node-status-type';
import type { FC } from 'react';

import Spinner1 from '@/theme/assets/icons/spinner-1';

interface NodeStatusProps {
  status: NodeStatusType | null;
}

const NodeStatus: FC<NodeStatusProps> = ({ status }) => {
  return (
    <p>
      {t(`common.nodeStatus.${status?.toLowerCase() ?? 'unknown'}`)}
      <i className="ml-1">
        {status === 'UP' ? <Spinner1 width="1rem" /> : null}
      </i>
    </p>
  );
};

export default NodeStatus;
