import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useDashboard from '@/helpers/state/useDashboard';
import { appRoutes } from '@/router/app-routes';

const NodeProviders: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodeProviders },
    nodeProviders,
    isNodeProvidersLoading,
    hasNodeProvidersError
  } = useDashboard();

  useEffect(() => {
    if (!nodeProviders) {
      getNodeProviders();
    }

    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
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

  return (
    <AccountsDataView
      list={nodeProviders}
      isLoading={isNodeProvidersLoading}
      parentRoute={appRoutes.nodeProviders.root}
    />
  );
};

export default NodeProviders;
