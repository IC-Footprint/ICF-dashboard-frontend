import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useDashboard from '@/helpers/state/useDashboard';
import { appRoutes } from '@/router/app-routes';

const NodeOperators: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodeOperators },
    nodeOperators,
    isNodeOperatorsLoading,
    hasNodeOperatorsError
  } = useDashboard();

  useEffect(() => {
    // TODO: add periodic refresh
    if (!nodeOperators) {
      getNodeOperators();
    }
  }, [nodeOperators, getNodeOperators]);

  if (hasNodeOperatorsError) {
    return <p>{t('dashboard.carbonAccounts.nodeOperators.error')}</p>;
  }

  return (
    <AccountsDataView
      list={nodeOperators}
      isLoading={isNodeOperatorsLoading}
      parentRoute={appRoutes.nodeOperators.root}
    />
  );
};

export default NodeOperators;
