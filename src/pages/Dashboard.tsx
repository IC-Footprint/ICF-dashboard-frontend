import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import useDashboard from '@/helpers/state/useDashboard';
import World from '@/components/dashboard/World';
import HeadlineFigures from '@/components/dashboard/HeadlineFigures';
import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import NodesCounters from '@/components/dashboard/NodesCounters';
import {
  DashboardContentContainer,
  DashboardRightPanelContainer,
  FlexColumnContainer,
  RelativeContainer,
  TableCardContainer
} from '@/theme/styled-components';

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const {
    actions: {
      getLocationsLeaderboard,
      getGlobePoints,
      getHeadlineFigures,
      getNodesCounters
    }
  } = useDashboard();
  useEffect(() => {
    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getLocationsLeaderboard();
      getGlobePoints();
      getHeadlineFigures();
      getNodesCounters();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    getLocationsLeaderboard,
    getGlobePoints,
    getHeadlineFigures,
    getNodesCounters
  ]);

  return (
    <FlexColumnContainer>
      <h3>{t('common.internetComputerFootprint')}</h3>
      <HeadlineFigures />
      <RelativeContainer>
        <DashboardContentContainer>
          <div className="grid w-full">
            <div className="col-12 xl:col-8 h-full">
              <World />
            </div>
            <DashboardRightPanelContainer className="col-12 xl:col-4 xl:h-full row-gap-3 md:row-gap-0 grid">
              <TableCardContainer className="md:col-12 flex-grow-1">
                <LocationsLeaderboard />
              </TableCardContainer>
              <TableCardContainer className="md:col-12 xl:mb-0 mb-3 flex-grow-0">
                <NodesCounters />
              </TableCardContainer>
            </DashboardRightPanelContainer>
          </div>
        </DashboardContentContainer>
      </RelativeContainer>
    </FlexColumnContainer>
  );
};

export default Dashboard;
