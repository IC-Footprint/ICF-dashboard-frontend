import { Column } from 'primereact/column';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { LocationEmissionsModel } from '@/models/dashboard/location-emissions-model';

import { DashboardTable, TableContainerCard } from '@/theme/styled-components';
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

  const emissionsTemplate = (rowData: LocationEmissionsModel) => {
    return t('common.unit.co2Kg', {
      value: rowData.emissions.toFixed(1)
    });
  };

  return (
    <TableContainerCard>
      <span>{t('common.leaderboard')}</span>
      <div className="min-h-0">
        <DashboardTable
          value={locationsLeaderboard ?? []}
          loading={isLocationsLeaderboardLoading}
          scrollable
          scrollHeight="flex"
        >
          <Column
            field="location"
            header={t('table.headers.location')}
          ></Column>
          <Column
            field="emissions"
            header={t('table.headers.emissionsLast30minutes')}
            body={emissionsTemplate}
          ></Column>
          <Column
            field="nodeCount"
            header={t('table.headers.nodeCount')}
          ></Column>
        </DashboardTable>
      </div>
    </TableContainerCard>
  );
};

export default LocationsLeaderboard;
