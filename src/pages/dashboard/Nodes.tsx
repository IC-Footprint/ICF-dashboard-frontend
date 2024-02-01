import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useDashboard from '@/helpers/state/useDashboard';
import useNodes from '@/helpers/state/useNodes';
import { appRoutes } from '@/router/app-routes';

const Nodes: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodesList },
    nodesList,
    isNodesListLoading,
    hasNodesListError
  } = useNodes();
  const { searchFilter } = useDashboard();

  useEffect(() => {
    if (!nodesList) {
      getNodesList();
    }

    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getNodesList();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [nodesList, getNodesList]);

  if (hasNodesListError) {
    return <p>{t('dashboard.carbonAccounts.nodes.error')}</p>;
  }

  const filteredNodesList =
    nodesList?.filter((node) => {
      return node.id.toLowerCase().includes(searchFilter.toLowerCase());
    }) ?? [];

  return (
    <AccountsDataView
      list={filteredNodesList}
      isLoading={isNodesListLoading}
      parentRoute={appRoutes.nodes.root}
      dataType="nodes"
    />
  );
};

export default Nodes;
