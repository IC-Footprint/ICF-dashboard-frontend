import { Column } from 'primereact/column';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';

import { DashboardTable, FlexColumnCard } from '@/theme/styled-components';
import useDashboard from '@/helpers/state/useDashboard';

const LocationsLeaderboard: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getLocationsLeaderboard },
    locationsLeaderboard,
    isLocationsLeaderboardLoading
  } = useDashboard();

  useEffect(() => {
    getLocationsLeaderboard();
  }, [getLocationsLeaderboard]);

  useEffect(() => {
    const minutesInterval: number =
      +process.env.REACT_APP_LOCATIONS_LEADERBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getLocationsLeaderboard();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [getLocationsLeaderboard]);

  const emissionsTemplate = (rowData: LocationEmissionsModel) => {
    return t('common.unit.co2Tonnes', {
      value: rowData.emissions.toFixed(1)
    });
  };

  return (
    <FlexColumnCard>
      <span>{t('common.leaderboard')}</span>
      <DashboardTable
        value={locationsLeaderboard ?? []}
        loading={isLocationsLeaderboardLoading}
        scrollable
        scrollHeight="20.5rem"
      >
        <Column field="location" header={t('table.headers.location')}></Column>
        <Column
          field="emissions"
          header={t('table.headers.emissionsLast30minutes')}
          body={emissionsTemplate}
        ></Column>
      </DashboardTable>
    </FlexColumnCard>
  );
};

export default LocationsLeaderboard;
