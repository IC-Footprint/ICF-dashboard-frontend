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
    // TODO: add periodic refresh
    if (!nodeProviders) {
      getNodeProviders();
    }
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
