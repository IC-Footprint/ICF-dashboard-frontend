import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import useDashboard from '@/helpers/state/useDashboard';
import { appRoutes } from '@/router/app-routes';

import { getSNS } from '@/api/sns-api';

const SNS: FC = () => {
  // translations use this for translating errors
  // const { t } = useTranslation();
  const { searchFilter } = useDashboard();

  // list of sns
  const [snsList, setSnsList] = useState<CarbonAccountModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getSNS();
    setSnsList(data);
    setLoading(false);
  };

  useEffect(() => {
    if (snsList.length === 0) {
      fetchData();
    }

    // const minutesInterval: number = +import.meta.env
    //   .VITE_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL;
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 1000 * 60 * minutesInterval);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [snsList]);

  // TODO: Error handle fetchsnsdata

  const filteredNodesList =
    snsList?.filter((sns) => {
      return sns.id.toLowerCase().includes(searchFilter.toLowerCase());
    }) ?? [];

  return (
    <AccountsDataView
      list={[
        {
          __typename: 'AddNewItem',
          title: 'Create New SNS',
          organizationType: 'sns'
        },
        ...filteredNodesList
      ]}
      isLoading={loading}
      parentRoute={appRoutes.sns.root}
      dataType="sns"
    />
  );
};

export default SNS;
