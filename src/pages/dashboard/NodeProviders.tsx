import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useDashboard from '@/helpers/state/useDashboard';
import { appRoutes } from '@/router/app-routes';

/**
 * Renders the NodeProviders component, which displays a list of node providers.
 * The component fetches the list of node providers from the backend and displays them in a table.
 * The table can be filtered by the operator name.
 * The component also automatically refreshes the list of node providers at a configurable interval.
 */
const NodeProviders: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodeProviders },
    nodeProviders,
    isNodeProvidersLoading,
    hasNodeProvidersError,
    searchFilter
  } = useDashboard();

  useEffect(() => {
    if (!nodeProviders || nodeProviders.length === 0) {
      getNodeProviders();
    }

    const minutesInterval: number = +import.meta.env
      .VITE_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL;
    const intervalId = setInterval(() => {
      getNodeProviders();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [nodeProviders, getNodeProviders]);

  if (hasNodeProvidersError) {
    return <p>{t('dashboard.carbonAccounts.nodeProviders.error')}</p>;
  }

  const filteredNodeProviders =
    nodeProviders?.filter((nodeProvider) => {
      return nodeProvider.operator?.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    }) ?? [];

  return (
    <AccountsDataView
      list={[{ __typename: 'AddNewItem', title: 'Create New Node Provider' }, ...filteredNodeProviders]}
      isLoading={isNodeProvidersLoading}
      parentRoute={appRoutes.nodeProviders.root}
    />
  );
};

export default NodeProviders;
