import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import useNodes from '@/helpers/state/useNodes';
import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import { appRoutes } from '@/router/app-routes';

const Nodes: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodesList },
    nodesList,
    isNodesListLoading,
    hasNodesListError
  } = useNodes();

  useEffect(() => {
    if (!nodesList) {
      getNodesList();
    }
  }, [nodesList, getNodesList]);

  if (hasNodesListError) {
    return <p>{t('dashboard.carbonAccounts.nodes.error')}</p>;
  }

  return (
    <AccountsDataView
      list={nodesList}
      isLoading={isNodesListLoading}
      parentRoute={appRoutes.nodes.root}
      dataType="nodes"
    />
  );
};

export default Nodes;
